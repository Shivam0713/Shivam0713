import { Router, Request, Response } from 'express';
import { Monastery, Scene } from '../models/types';

const router = Router();

// Sample data for demonstration
const sampleMonasteries: Monastery[] = [
  {
    id: '1',
    name: 'Tashilhunpo Monastery',
    location: {
      country: 'Tibet',
      region: 'Shigatse',
      coordinates: { lat: 29.2675, lon: 88.8707 }
    },
    description: 'One of the largest functioning monasteries in Tibet, founded in 1447.',
    founded: 1447,
    images: ['monastery1.jpg', 'monastery1_2.jpg'],
    virtualTour: {
      url: '/tours/tashilhunpo',
      scenes: [
        {
          id: 'scene1',
          name: 'Main Hall',
          url: '/360/tashilhunpo_main.jpg',
          hotspots: [],
          narration: {
            'English': { text: 'Welcome to the main hall...', audioUrl: '/audio/en/main_hall.mp3' },
            'Tibetan': { text: 'ཆོས་འཁོར་ལ་བསུ་བ...', audioUrl: '/audio/tb/main_hall.mp3' }
          }
        }
      ]
    },
    availableLanguages: ['English', 'Tibetan', 'Hindi', 'Nepali'],
    artifacts: ['artifact1', 'artifact2'],
    events: ['event1'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Hemis Monastery',
    location: {
      country: 'India',
      region: 'Ladakh',
      coordinates: { lat: 34.0082, lon: 77.6619 }
    },
    description: 'The largest and richest monastery in Ladakh, famous for its annual festival.',
    founded: 1630,
    images: ['hemis1.jpg', 'hemis2.jpg'],
    virtualTour: {
      url: '/tours/hemis',
      scenes: [
        {
          id: 'scene1',
          name: 'Courtyard',
          url: '/360/hemis_courtyard.jpg',
          hotspots: [],
          narration: {
            'English': { text: 'This is the main courtyard...', audioUrl: '/audio/en/courtyard.mp3' },
            'Hindi': { text: 'यह मुख्य आंगन है...', audioUrl: '/audio/hi/courtyard.mp3' }
          }
        }
      ]
    },
    availableLanguages: ['English', 'Hindi', 'Tibetan'],
    artifacts: ['artifact3', 'artifact4'],
    events: ['event2'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// GET /api/tours - Get all monasteries
router.get('/', (req: Request, res: Response) => {
  try {
    const { language = 'English', country, founded_after, founded_before } = req.query;
    
    let filteredMonasteries = sampleMonasteries;
    
    // Filter by country
    if (country) {
      filteredMonasteries = filteredMonasteries.filter(m => 
        m.location.country.toLowerCase() === (country as string).toLowerCase()
      );
    }
    
    // Filter by founded date
    if (founded_after) {
      filteredMonasteries = filteredMonasteries.filter(m => 
        m.founded >= parseInt(founded_after as string)
      );
    }
    
    if (founded_before) {
      filteredMonasteries = filteredMonasteries.filter(m => 
        m.founded <= parseInt(founded_before as string)
      );
    }
    
    // Filter by available languages
    filteredMonasteries = filteredMonasteries.filter(m => 
      m.availableLanguages.includes(language as string)
    );
    
    res.json({
      success: true,
      data: filteredMonasteries,
      total: filteredMonasteries.length,
      language: language
    });
  } catch (error) {
    console.error('Error fetching monasteries:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch monasteries'
    });
  }
});

// GET /api/tours/:id - Get specific monastery
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { language = 'English' } = req.query;
    
    const monastery = sampleMonasteries.find(m => m.id === id);
    
    if (!monastery) {
      return res.status(404).json({
        success: false,
        error: 'Monastery not found'
      });
    }
    
    // Check if language is available
    if (!monastery.availableLanguages.includes(language as string)) {
      return res.status(400).json({
        success: false,
        error: `Language ${language} not available for this monastery`,
        availableLanguages: monastery.availableLanguages
      });
    }
    
    res.json({
      success: true,
      data: monastery,
      language: language
    });
  } catch (error) {
    console.error('Error fetching monastery:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch monastery'
    });
  }
});

// GET /api/tours/:id/scenes - Get virtual tour scenes
router.get('/:id/scenes', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { language = 'English' } = req.query;
    
    const monastery = sampleMonasteries.find(m => m.id === id);
    
    if (!monastery) {
      return res.status(404).json({
        success: false,
        error: 'Monastery not found'
      });
    }
    
    res.json({
      success: true,
      data: {
        scenes: monastery.virtualTour.scenes,
        language: language
      }
    });
  } catch (error) {
    console.error('Error fetching scenes:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch virtual tour scenes'
    });
  }
});

// GET /api/tours/search - Search monasteries
router.get('/search/:query', (req: Request, res: Response) => {
  try {
    const { query } = req.params;
    const { language = 'English' } = req.query;
    
    const searchResults = sampleMonasteries.filter(monastery => 
      monastery.name.toLowerCase().includes(query.toLowerCase()) ||
      monastery.description.toLowerCase().includes(query.toLowerCase()) ||
      monastery.location.country.toLowerCase().includes(query.toLowerCase()) ||
      monastery.location.region.toLowerCase().includes(query.toLowerCase())
    );
    
    res.json({
      success: true,
      data: searchResults,
      total: searchResults.length,
      query: query,
      language: language
    });
  } catch (error) {
    console.error('Error searching monasteries:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search monasteries'
    });
  }
});

export default router;