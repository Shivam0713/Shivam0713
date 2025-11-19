# 🏛️ Monastery360 - Digital Heritage Preservation Platform

[![Build Status](https://github.com/Shivam0713/Shivam0713/workflows/Monastery360%20CI/CD%20Pipeline/badge.svg)](https://github.com/Shivam0713/Shivam0713/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)

A comprehensive digital platform for preserving and exploring monastery heritage through immersive 360° virtual tours, multilingual narration, and AI-powered archive search. Built with modern web technologies including React, Next.js, Node.js, and integrated AI services.

## 🌟 Features

### Frontend (React/Next.js)
- **🏠 Landing Page**: Project introduction with modern, responsive design
- **🌐 360° Virtual Tours**: Immersive monastery exploration using Three.js/A-Frame
- **🎧 Multilingual Narration**: Support for English, Hindi, Nepali, and Tibetan
- **🗺️ Interactive Maps**: Monastery locations with nearby attractions (Mapbox integration ready)
- **📅 Events Calendar**: Booking system for monastery events and tours
- **🔐 Authentication**: OAuth integration (Google/Apple) with JWT tokens
- **👥 Role-based Access**: Admin, Researcher, and Tourist user types
- **📱 Responsive Design**: Optimized for desktop and mobile devices
- **⚡ Performance**: Next.js 14 with Turbopack for fast development

### Backend (Node.js/Express)
- **🏗️ Microservices Architecture**: Modular service design
- **🔗 REST + GraphQL APIs**: Flexible data access patterns
- **🗄️ Multi-Database Support**: PostgreSQL + MongoDB integration ready
- **🔒 JWT Authentication**: Secure token-based authentication
- **👨‍💼 Admin Panel**: CRUD operations for content management
- **🌍 Third-party Integrations**: Mapbox, payment gateways ready
- **📖 API Documentation**: Swagger/OpenAPI documentation
- **🎯 Demo Data**: Pre-seeded sample monasteries and events

### AI/ML Integration
- **🤖 Multilingual TTS**: AI-powered text-to-speech narration
- **🔍 Semantic Search**: Natural language archive search
- **🏷️ Auto-tagging**: Intelligent metadata extraction
- **🎤 Speech-to-Text**: Voice input processing
- **📊 Content Analysis**: Automated archive categorization

### DevOps & Deployment
- **🐳 Docker Support**: Full containerization with docker-compose
- **🚀 CI/CD Pipeline**: GitHub Actions automated testing and deployment
- **🔒 Security Scanning**: Trivy vulnerability assessment
- **📈 Performance Testing**: Lighthouse CI integration
- **☁️ Cloud Ready**: AWS/Firebase deployment configurations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Docker (optional)

### Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/Shivam0713/Shivam0713.git
cd Shivam0713
```

2. **Start Backend Server**
```bash
cd monastery360-backend
npm install
cp .env.example .env
npm run dev
```
The backend will be available at `http://localhost:3001`

3. **Start Frontend Application**
```bash
cd monastery360-frontend
npm install
npm run dev
```
The frontend will be available at `http://localhost:3000`

### Using Docker

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile

### Tours & Monasteries
- `GET /api/tours` - List all monasteries
- `GET /api/tours/:id` - Get monastery details
- `GET /api/tours/:id/scenes` - Get virtual tour scenes
- `GET /api/tours/search/:query` - Search monasteries

### Archives & Digital Collections
- `GET /api/archives` - Browse archives
- `GET /api/archives/:id` - Get archive details
- `GET /api/archives/search/:query` - AI-powered semantic search
- `GET /api/archives/meta/tags` - Get available tags

### Events & Booking
- `GET /api/events` - List events
- `POST /api/events/:id/book` - Book an event
- `GET /api/events/calendar/:year/:month` - Calendar view

### AI Services
- `POST /api/ai/narration/generate` - Generate multilingual narration
- `POST /api/ai/search/semantic` - Semantic search
- `POST /api/ai/metadata/extract` - Extract content metadata
- `GET /api/ai/languages` - Supported languages

### Interactive Maps
- `GET /api/maps/locations` - Get map locations
- `GET /api/maps/nearby/:id` - Find nearby attractions
- `GET /api/maps/search` - Search locations

## 🏗️ Architecture

```
Monastery360/
├── monastery360-frontend/          # Next.js React application
│   ├── src/
│   │   ├── app/                   # Next.js App Router pages
│   │   ├── components/            # Reusable React components
│   │   └── lib/                   # Utility functions
│   ├── public/                    # Static assets
│   └── Dockerfile                 # Frontend container config
│
├── monastery360-backend/           # Node.js Express API
│   ├── src/
│   │   ├── routes/               # API route handlers
│   │   ├── models/               # Data models and types
│   │   ├── services/             # Business logic services
│   │   ├── middleware/           # Express middleware
│   │   └── utils/                # Helper utilities
│   └── Dockerfile                # Backend container config
│
├── docker-compose.yml             # Multi-container setup
├── .github/workflows/             # CI/CD pipelines
└── docs/                         # Project documentation
```

## 🧪 Testing

### Backend Tests
```bash
cd monastery360-backend
npm test
```

### Frontend Tests
```bash
cd monastery360-frontend
npm test
```

### Integration Tests
```bash
# Start services
docker-compose up -d

# Run integration tests
npm run test:integration
```

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your-jwt-secret
DATABASE_URL=postgresql://user:pass@localhost:5432/monastery360
MONGODB_URL=mongodb://localhost:27017/monastery360
OPENAI_API_KEY=your-openai-key
MAPBOX_ACCESS_TOKEN=your-mapbox-token
```

**Frontend (.env.local)**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_MAPBOX_TOKEN=your-mapbox-token
```

## 📱 Demo Credentials

For testing the application:

- **Admin**: admin@monastery360.com / admin123
- **Researcher**: researcher@monastery360.com / research123  
- **Tourist**: tourist@monastery360.com / tourist123

## 🎯 Demo Features

### Sample Data Included:
- **3 Monasteries**: Tashilhunpo, Hemis, Rumtek with detailed information
- **4 Events**: Festivals, ceremonies, workshops, and tours
- **6 Archive Items**: Manuscripts, artifacts, and documents
- **4 Languages**: English, Hindi, Nepali, Tibetan narration support
- **Interactive Map**: Sample locations with nearby attractions

### Live Demo URLs:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:3001`
- API Documentation: `http://localhost:3001/` (interactive endpoint list)
- Health Check: `http://localhost:3001/health`

## 🚀 Deployment

### Production Build
```bash
# Backend
cd monastery360-backend
npm run build
npm start

# Frontend  
cd monastery360-frontend
npm run build
npm start
```

### Docker Production
```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Deploy
docker-compose -f docker-compose.prod.yml up -d
```

### Cloud Deployment

**AWS ECS/Fargate**
```bash
# Build and push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account>.dkr.ecr.us-east-1.amazonaws.com
docker build -t monastery360-frontend ./monastery360-frontend
docker tag monastery360-frontend:latest <account>.dkr.ecr.us-east-1.amazonaws.com/monastery360-frontend:latest
docker push <account>.dkr.ecr.us-east-1.amazonaws.com/monastery360-frontend:latest
```

## 🛡️ Security

- **JWT Authentication**: Secure token-based auth
- **Rate Limiting**: API endpoint protection
- **Input Validation**: Request sanitization
- **CORS Configuration**: Cross-origin protection
- **Helmet.js**: Security headers
- **Environment Variables**: Sensitive data protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Buddhist monasteries worldwide for their cultural heritage
- Open source community for amazing tools and libraries
- Contributors and testers

## 📞 Support

For support and questions:
- 📧 Email: shivamkumar0713@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/Shivam0713/Shivam0713/issues)
- 📖 Documentation: [Wiki](https://github.com/Shivam0713/Shivam0713/wiki)

---

**Built with ❤️ by [Shivam Kumar](https://github.com/Shivam0713)**