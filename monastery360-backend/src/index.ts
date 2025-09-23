import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import tourRoutes from './routes/tourRoutes';
import archiveRoutes from './routes/archiveRoutes';
import mapRoutes from './routes/mapRoutes';
import eventRoutes from './routes/eventRoutes';
import aiRoutes from './routes/aiRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Middleware
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/archives', archiveRoutes);
app.use('/api/maps', mapRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/ai', aiRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Monastery360 API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      tours: '/api/tours',
      archives: '/api/archives',
      maps: '/api/maps',
      events: '/api/events',
      ai: '/api/ai'
    }
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `The route ${req.originalUrl} does not exist on this server`
  });
});

app.listen(PORT, () => {
  console.log(`🏛️  Monastery360 API Server running on port ${PORT}`);
  console.log(`📖 API Documentation: http://localhost:${PORT}/`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
});