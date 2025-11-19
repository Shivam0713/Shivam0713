import { Router, Request, Response } from 'express';

const router = Router();

interface MapLocation {
  id: string;
  name: string;
  type: 'monastery' | 'hotel' | 'restaurant' | 'attraction' | 'transport';
  coordinates: {
    lat: number;
    lon: number;
  };
  address: string;
  description: string;
  rating?: number;
  priceRange?: string;
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  amenities?: string[];
  openingHours?: {
    [day: string]: string;
  };
}

// Sample location data
const locations: MapLocation[] = [
  {
    id: '1',
    name: 'Tashilhunpo Monastery',
    type: 'monastery',
    coordinates: { lat: 29.2675, lon: 88.8707 },
    address: 'Shigatse, Tibet',
    description: 'One of the largest functioning monasteries in Tibet',
    rating: 4.8,
    contact: {
      website: 'https://tashilhunpo.org'
    },
    amenities: ['360° Virtual Tour', 'Guided Tours', 'Audio Guide', 'Gift Shop'],
    openingHours: {
      'Monday': '9:00 AM - 6:00 PM',
      'Tuesday': '9:00 AM - 6:00 PM',
      'Wednesday': '9:00 AM - 6:00 PM',
      'Thursday': '9:00 AM - 6:00 PM',
      'Friday': '9:00 AM - 6:00 PM',
      'Saturday': '9:00 AM - 6:00 PM',
      'Sunday': '9:00 AM - 6:00 PM'
    }
  },
  {
    id: '2',
    name: 'Hemis Monastery',
    type: 'monastery',
    coordinates: { lat: 34.0082, lon: 77.6619 },
    address: 'Hemis, Ladakh, India',
    description: 'The largest monastery in Ladakh',
    rating: 4.7,
    contact: {
      website: 'https://hemis-monastery.org'
    },
    amenities: ['360° Virtual Tour', 'Festival Events', 'Museum', 'Library'],
    openingHours: {
      'Monday': '8:00 AM - 1:00 PM, 2:00 PM - 6:00 PM',
      'Tuesday': '8:00 AM - 1:00 PM, 2:00 PM - 6:00 PM',
      'Wednesday': '8:00 AM - 1:00 PM, 2:00 PM - 6:00 PM',
      'Thursday': '8:00 AM - 1:00 PM, 2:00 PM - 6:00 PM',
      'Friday': '8:00 AM - 1:00 PM, 2:00 PM - 6:00 PM',
      'Saturday': '8:00 AM - 1:00 PM, 2:00 PM - 6:00 PM',
      'Sunday': '8:00 AM - 1:00 PM, 2:00 PM - 6:00 PM'
    }
  },
  {
    id: '3',
    name: 'Mountain View Hotel',
    type: 'hotel',
    coordinates: { lat: 29.2680, lon: 88.8710 },
    address: 'Near Tashilhunpo Monastery, Shigatse, Tibet',
    description: 'Comfortable accommodation with monastery views',
    rating: 4.2,
    priceRange: '$$',
    contact: {
      phone: '+86-892-123-4567',
      email: 'info@mountainviewhotel.com'
    },
    amenities: ['Free WiFi', 'Restaurant', 'Mountain Views', 'Parking'],
    openingHours: {
      'Monday': '24 hours',
      'Tuesday': '24 hours',
      'Wednesday': '24 hours',
      'Thursday': '24 hours',
      'Friday': '24 hours',
      'Saturday': '24 hours',
      'Sunday': '24 hours'
    }
  },
  {
    id: '4',
    name: 'Tibetan Kitchen',
    type: 'restaurant',
    coordinates: { lat: 29.2672, lon: 88.8705 },
    address: 'Main Street, Shigatse, Tibet',
    description: 'Authentic Tibetan cuisine and traditional dishes',
    rating: 4.5,
    priceRange: '$',
    contact: {
      phone: '+86-892-987-6543'
    },
    amenities: ['Vegetarian Options', 'Traditional Music', 'Outdoor Seating'],
    openingHours: {
      'Monday': '11:00 AM - 10:00 PM',
      'Tuesday': '11:00 AM - 10:00 PM',
      'Wednesday': '11:00 AM - 10:00 PM',
      'Thursday': '11:00 AM - 10:00 PM',
      'Friday': '11:00 AM - 10:00 PM',
      'Saturday': '11:00 AM - 10:00 PM',
      'Sunday': '11:00 AM - 10:00 PM'
    }
  }
];

// GET /api/maps/locations - Get all locations
router.get('/locations', (req: Request, res: Response) => {
  try {
    const { 
      type,
      lat,
      lon,
      radius = 10,
      limit = 50
    } = req.query;
    
    let filteredLocations = locations;
    
    // Filter by type
    if (type) {
      const types = (type as string).split(',');
      filteredLocations = filteredLocations.filter(loc => 
        types.includes(loc.type)
      );
    }
    
    // Filter by radius (if center coordinates provided)
    if (lat && lon) {
      const centerLat = parseFloat(lat as string);
      const centerLon = parseFloat(lon as string);
      const radiusKm = parseFloat(radius as string);
      
      filteredLocations = filteredLocations.filter(loc => {
        const distance = calculateDistance(
          centerLat, centerLon,
          loc.coordinates.lat, loc.coordinates.lon
        );
        return distance <= radiusKm;
      });
    }
    
    // Limit results
    const limitNum = parseInt(limit as string);
    if (limitNum) {
      filteredLocations = filteredLocations.slice(0, limitNum);
    }
    
    res.json({
      success: true,
      data: filteredLocations,
      total: filteredLocations.length,
      filters: { type, center: lat && lon ? { lat, lon } : null, radius }
    });
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch locations'
    });
  }
});

// GET /api/maps/locations/:id - Get specific location
router.get('/locations/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const location = locations.find(loc => loc.id === id);
    
    if (!location) {
      return res.status(404).json({
        success: false,
        error: 'Location not found'
      });
    }
    
    res.json({
      success: true,
      data: location
    });
  } catch (error) {
    console.error('Error fetching location:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch location'
    });
  }
});

// GET /api/maps/nearby/:id - Get nearby locations
router.get('/nearby/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { types, radius = 5, limit = 10 } = req.query;
    
    const centerLocation = locations.find(loc => loc.id === id);
    
    if (!centerLocation) {
      return res.status(404).json({
        success: false,
        error: 'Center location not found'
      });
    }
    
    let nearbyLocations = locations.filter(loc => loc.id !== id);
    
    // Filter by types if specified
    if (types) {
      const typeArray = (types as string).split(',');
      nearbyLocations = nearbyLocations.filter(loc => 
        typeArray.includes(loc.type)
      );
    }
    
    // Calculate distances and filter by radius
    const radiusKm = parseFloat(radius as string);
    const locationsWithDistance = nearbyLocations
      .map(loc => ({
        ...loc,
        distance: calculateDistance(
          centerLocation.coordinates.lat,
          centerLocation.coordinates.lon,
          loc.coordinates.lat,
          loc.coordinates.lon
        )
      }))
      .filter(loc => loc.distance <= radiusKm)
      .sort((a, b) => a.distance - b.distance);
    
    // Limit results
    const limitNum = parseInt(limit as string);
    const limitedResults = locationsWithDistance.slice(0, limitNum);
    
    res.json({
      success: true,
      data: limitedResults,
      center: centerLocation,
      total: limitedResults.length,
      filters: { types, radius }
    });
  } catch (error) {
    console.error('Error fetching nearby locations:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch nearby locations'
    });
  }
});

// GET /api/maps/search - Search locations
router.get('/search', (req: Request, res: Response) => {
  try {
    const { q, type } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
    }
    
    const query = (q as string).toLowerCase();
    let searchResults = locations;
    
    // Filter by type if specified
    if (type) {
      searchResults = searchResults.filter(loc => loc.type === type);
    }
    
    // Search in name, description, and address
    searchResults = searchResults.filter(loc =>
      loc.name.toLowerCase().includes(query) ||
      loc.description.toLowerCase().includes(query) ||
      loc.address.toLowerCase().includes(query) ||
      (loc.amenities && loc.amenities.some(amenity => 
        amenity.toLowerCase().includes(query)
      ))
    );
    
    res.json({
      success: true,
      data: searchResults,
      query: q,
      total: searchResults.length
    });
  } catch (error) {
    console.error('Error searching locations:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search locations'
    });
  }
});

// Utility function to calculate distance between two coordinates
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI/180);
}

export default router;