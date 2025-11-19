import { Router, Request, Response } from 'express';
import { Event, Booking } from '../models/types';

const router = Router();

// Sample events data
const events: Event[] = [
  {
    id: '1',
    title: 'Hemis Festival 2024',
    description: 'Annual festival celebrating the birth of Guru Padmasambhava with traditional masked dances',
    monastery: '2',
    date: new Date('2024-07-15T09:00:00Z'),
    duration: 480, // 8 hours
    capacity: 200,
    bookings: 45,
    price: 50,
    type: 'festival',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    title: 'Morning Prayer Ceremony',
    description: 'Join the monks for traditional morning prayers and meditation',
    monastery: '1',
    date: new Date('2024-06-20T06:00:00Z'),
    duration: 120, // 2 hours
    capacity: 50,
    bookings: 12,
    price: 25,
    type: 'ceremony',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    title: 'Buddhist Philosophy Workshop',
    description: 'Learn about Buddhist philosophy and meditation techniques from experienced practitioners',
    monastery: '1',
    date: new Date('2024-06-25T14:00:00Z'),
    duration: 180, // 3 hours
    capacity: 30,
    bookings: 8,
    price: 75,
    type: 'workshop',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    title: 'Guided Monastery Tour',
    description: 'Comprehensive guided tour of the monastery with historical insights',
    monastery: '2',
    date: new Date('2024-06-22T10:00:00Z'),
    duration: 90, // 1.5 hours
    capacity: 25,
    bookings: 15,
    price: 30,
    type: 'tour',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Sample bookings data
const bookings: Booking[] = [
  {
    id: '1',
    userId: '1',
    eventId: '1',
    numberOfPeople: 2,
    totalAmount: 100,
    status: 'confirmed',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// GET /api/events - Get all events
router.get('/', (req: Request, res: Response) => {
  try {
    const { 
      monastery,
      type,
      date_from,
      date_to,
      available_only = 'false',
      page = 1,
      limit = 10
    } = req.query;
    
    let filteredEvents = events;
    
    // Filter by monastery
    if (monastery) {
      filteredEvents = filteredEvents.filter(e => e.monastery === monastery);
    }
    
    // Filter by type
    if (type) {
      filteredEvents = filteredEvents.filter(e => e.type === type);
    }
    
    // Filter by date range
    if (date_from) {
      const fromDate = new Date(date_from as string);
      filteredEvents = filteredEvents.filter(e => e.date >= fromDate);
    }
    
    if (date_to) {
      const toDate = new Date(date_to as string);
      filteredEvents = filteredEvents.filter(e => e.date <= toDate);
    }
    
    // Filter by availability
    if (available_only === 'true') {
      filteredEvents = filteredEvents.filter(e => e.bookings < e.capacity);
    }
    
    // Sort by date
    filteredEvents.sort((a, b) => a.date.getTime() - b.date.getTime());
    
    // Pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    
    const paginatedEvents = filteredEvents.slice(startIndex, endIndex);
    
    // Add availability info
    const eventsWithAvailability = paginatedEvents.map(event => ({
      ...event,
      availableSpots: event.capacity - event.bookings,
      isAvailable: event.bookings < event.capacity
    }));
    
    res.json({
      success: true,
      data: eventsWithAvailability,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: filteredEvents.length,
        totalPages: Math.ceil(filteredEvents.length / limitNum)
      },
      filters: { monastery, type, date_from, date_to, available_only }
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch events'
    });
  }
});

// GET /api/events/:id - Get specific event
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const event = events.find(e => e.id === id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }
    
    const eventWithAvailability = {
      ...event,
      availableSpots: event.capacity - event.bookings,
      isAvailable: event.bookings < event.capacity
    };
    
    res.json({
      success: true,
      data: eventWithAvailability
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch event'
    });
  }
});

// POST /api/events/:id/book - Book an event
router.post('/:id/book', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId, numberOfPeople = 1 } = req.body;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      });
    }
    
    const event = events.find(e => e.id === id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }
    
    // Check availability
    if (event.bookings + numberOfPeople > event.capacity) {
      return res.status(400).json({
        success: false,
        error: 'Not enough spots available',
        availableSpots: event.capacity - event.bookings
      });
    }
    
    // Create booking
    const newBooking: Booking = {
      id: (bookings.length + 1).toString(),
      userId,
      eventId: id,
      numberOfPeople,
      totalAmount: event.price * numberOfPeople,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    bookings.push(newBooking);
    
    // Update event bookings count
    event.bookings += numberOfPeople;
    event.updatedAt = new Date();
    
    res.status(201).json({
      success: true,
      data: {
        booking: newBooking,
        event: {
          ...event,
          availableSpots: event.capacity - event.bookings
        }
      }
    });
  } catch (error) {
    console.error('Error booking event:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to book event'
    });
  }
});

// GET /api/events/bookings/:userId - Get user's bookings
router.get('/bookings/:userId', (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { status } = req.query;
    
    let userBookings = bookings.filter(b => b.userId === userId);
    
    // Filter by status if provided
    if (status) {
      userBookings = userBookings.filter(b => b.status === status);
    }
    
    // Add event details to bookings
    const bookingsWithEvents = userBookings.map(booking => {
      const event = events.find(e => e.id === booking.eventId);
      return {
        ...booking,
        event
      };
    });
    
    res.json({
      success: true,
      data: bookingsWithEvents,
      total: bookingsWithEvents.length
    });
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch bookings'
    });
  }
});

// PUT /api/events/bookings/:id/cancel - Cancel a booking
router.put('/bookings/:id/cancel', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    
    const booking = bookings.find(b => b.id === id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }
    
    // Check if user owns the booking
    if (booking.userId !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Unauthorized to cancel this booking'
      });
    }
    
    // Check if booking can be cancelled
    if (booking.status === 'cancelled' || booking.status === 'completed') {
      return res.status(400).json({
        success: false,
        error: 'Booking cannot be cancelled'
      });
    }
    
    // Cancel booking
    booking.status = 'cancelled';
    booking.updatedAt = new Date();
    
    // Update event bookings count
    const event = events.find(e => e.id === booking.eventId);
    if (event) {
      event.bookings -= booking.numberOfPeople;
      event.updatedAt = new Date();
    }
    
    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to cancel booking'
    });
  }
});

// GET /api/events/calendar/:year/:month - Get events for calendar view
router.get('/calendar/:year/:month', (req: Request, res: Response) => {
  try {
    const { year, month } = req.params;
    const { monastery } = req.query;
    
    const yearNum = parseInt(year);
    const monthNum = parseInt(month);
    
    if (monthNum < 1 || monthNum > 12) {
      return res.status(400).json({
        success: false,
        error: 'Invalid month'
      });
    }
    
    // Filter events for the specified month and year
    let monthEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === yearNum && 
             eventDate.getMonth() === monthNum - 1;
    });
    
    // Filter by monastery if specified
    if (monastery) {
      monthEvents = monthEvents.filter(e => e.monastery === monastery);
    }
    
    // Group events by date
    const eventsByDate: { [date: string]: any[] } = {};
    
    monthEvents.forEach(event => {
      const dateKey = event.date.toISOString().split('T')[0];
      if (!eventsByDate[dateKey]) {
        eventsByDate[dateKey] = [];
      }
      eventsByDate[dateKey].push({
        ...event,
        availableSpots: event.capacity - event.bookings
      });
    });
    
    res.json({
      success: true,
      data: eventsByDate,
      year: yearNum,
      month: monthNum,
      totalEvents: monthEvents.length
    });
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch calendar events'
    });
  }
});

export default router;