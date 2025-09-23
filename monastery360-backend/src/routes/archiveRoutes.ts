import { Router, Request, Response } from 'express';
import { Archive } from '../models/types';

const router = Router();

// Sample archives data
const sampleArchives: Archive[] = [
  {
    id: '1',
    title: 'Ancient Buddhist Manuscript',
    description: 'A 13th century manuscript containing Buddhist teachings and prayers.',
    type: 'manuscript',
    monastery: '1',
    tags: ['buddhist', 'manuscript', '13th-century', 'prayers'],
    metadata: {
      language: 'Tibetan',
      pages: 156,
      material: 'palm-leaf',
      condition: 'good'
    },
    fileUrl: '/archives/manuscript_001.pdf',
    thumbnailUrl: '/thumbnails/manuscript_001.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    title: 'Prayer Wheel Artifact',
    description: 'A traditional Tibetan prayer wheel from the 15th century.',
    type: 'artifact',
    monastery: '1',
    tags: ['prayer-wheel', 'tibetan', '15th-century', 'artifact'],
    metadata: {
      material: 'copper and silver',
      height: '25cm',
      weight: '800g',
      inscriptions: 'Om Mani Padme Hum'
    },
    fileUrl: '/archives/prayer_wheel_001.obj',
    thumbnailUrl: '/thumbnails/prayer_wheel_001.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    title: 'Monastery Foundation Document',
    description: 'Historical document detailing the foundation of Hemis Monastery.',
    type: 'document',
    monastery: '2',
    tags: ['foundation', 'historical', 'hemis', '17th-century'],
    metadata: {
      language: 'Tibetan and Sanskrit',
      date: '1630',
      author: 'Lama Tagtsang Repa',
      material: 'paper'
    },
    fileUrl: '/archives/foundation_doc_002.pdf',
    thumbnailUrl: '/thumbnails/foundation_doc_002.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// GET /api/archives - Get all archives
router.get('/', (req: Request, res: Response) => {
  try {
    const { 
      monastery, 
      type, 
      tags, 
      search, 
      page = 1, 
      limit = 10 
    } = req.query;
    
    let filteredArchives = sampleArchives;
    
    // Filter by monastery
    if (monastery) {
      filteredArchives = filteredArchives.filter(a => a.monastery === monastery);
    }
    
    // Filter by type
    if (type) {
      filteredArchives = filteredArchives.filter(a => a.type === type);
    }
    
    // Filter by tags
    if (tags) {
      const tagArray = (tags as string).split(',');
      filteredArchives = filteredArchives.filter(a => 
        tagArray.some(tag => a.tags.includes(tag.trim()))
      );
    }
    
    // Search in title and description
    if (search) {
      const searchTerm = (search as string).toLowerCase();
      filteredArchives = filteredArchives.filter(a => 
        a.title.toLowerCase().includes(searchTerm) ||
        a.description.toLowerCase().includes(searchTerm) ||
        a.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    // Pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    
    const paginatedArchives = filteredArchives.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: paginatedArchives,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: filteredArchives.length,
        totalPages: Math.ceil(filteredArchives.length / limitNum)
      }
    });
  } catch (error) {
    console.error('Error fetching archives:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch archives'
    });
  }
});

// GET /api/archives/:id - Get specific archive
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const archive = sampleArchives.find(a => a.id === id);
    
    if (!archive) {
      return res.status(404).json({
        success: false,
        error: 'Archive not found'
      });
    }
    
    res.json({
      success: true,
      data: archive
    });
  } catch (error) {
    console.error('Error fetching archive:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch archive'
    });
  }
});

// GET /api/archives/search/:query - AI-powered semantic search
router.get('/search/:query', (req: Request, res: Response) => {
  try {
    const { query } = req.params;
    const { monastery, type, century } = req.query;
    
    // Simulate AI-powered search
    let searchResults = sampleArchives;
    
    // Basic text search (in production, this would use AI/NLP)
    const searchTerm = query.toLowerCase();
    searchResults = searchResults.filter(archive => {
      const matches = 
        archive.title.toLowerCase().includes(searchTerm) ||
        archive.description.toLowerCase().includes(searchTerm) ||
        archive.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        Object.values(archive.metadata).some(value => 
          String(value).toLowerCase().includes(searchTerm)
        );
      
      return matches;
    });
    
    // Apply additional filters
    if (monastery) {
      searchResults = searchResults.filter(a => a.monastery === monastery);
    }
    
    if (type) {
      searchResults = searchResults.filter(a => a.type === type);
    }
    
    if (century) {
      searchResults = searchResults.filter(a => 
        a.tags.some(tag => tag.includes(century as string))
      );
    }
    
    // Simulate semantic search results with relevance scores
    const resultsWithScore = searchResults.map(archive => ({
      ...archive,
      relevanceScore: Math.random() * 0.5 + 0.5 // Random score between 0.5-1.0
    })).sort((a, b) => b.relevanceScore - a.relevanceScore);
    
    res.json({
      success: true,
      data: resultsWithScore,
      query: query,
      total: resultsWithScore.length,
      searchType: 'semantic',
      filters: { monastery, type, century }
    });
  } catch (error) {
    console.error('Error in semantic search:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to perform semantic search'
    });
  }
});

// GET /api/archives/tags - Get all available tags
router.get('/meta/tags', (req: Request, res: Response) => {
  try {
    const allTags = [...new Set(sampleArchives.flatMap(archive => archive.tags))];
    
    res.json({
      success: true,
      data: allTags.sort()
    });
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tags'
    });
  }
});

// GET /api/archives/types - Get all available types
router.get('/meta/types', (req: Request, res: Response) => {
  try {
    const allTypes = [...new Set(sampleArchives.map(archive => archive.type))];
    
    res.json({
      success: true,
      data: allTypes.sort()
    });
  } catch (error) {
    console.error('Error fetching types:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch types'
    });
  }
});

export default router;