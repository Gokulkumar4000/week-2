# FeedbackPro - Customer Review Management System

## Overview

FeedbackPro is a full-stack customer review management application built with React and Express. The system allows customers to submit reviews with ratings and comments, while providing administrators with real-time analytics and dashboards to monitor feedback trends and sentiment analysis.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system variables
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Charts**: Chart.js for data visualization
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: PostgreSQL sessions with connect-pg-simple
- **API Design**: RESTful endpoints with JSON responses
- **External Integration**: Google Sheets API for data backup/export

### Development Setup
- **Monorepo Structure**: Client and server code in separate directories with shared schema
- **Build System**: Vite for frontend, esbuild for backend production builds
- **Type Safety**: Shared TypeScript types between frontend and backend
- **Development Tools**: Hot reload for both frontend and backend

## Key Components

### Database Schema
- **Reviews Table**: Stores review data including rating (1-5), comment, sentiment analysis, email, and timestamps
- **Users Table**: Basic user authentication structure (prepared for future auth features)
- **Drizzle Configuration**: PostgreSQL dialect with migration support

### API Endpoints
- `POST /api/reviews` - Submit new customer reviews
- `GET /api/reviews` - Retrieve all reviews for admin dashboard
- `GET /api/reviews/stats` - Get aggregated statistics and analytics

### Frontend Pages
- **Home Page**: Customer-facing review submission form with star ratings
- **Dashboard Page**: Admin analytics with charts and recent reviews
- **404 Page**: Error handling for unmatched routes

### Core Features
- Star rating component with hover effects and descriptive text
- Sentiment analysis integration (positive/neutral/negative)
- Real-time statistics dashboard with rating distribution
- Chart.js visualizations for review analytics
- Google Sheets integration for data export
- Responsive design with mobile navigation

## Data Flow

1. **Review Submission**: Customer fills out form → Client validation with Zod → API request to server → Database storage → Optional Google Sheets backup
2. **Dashboard Loading**: Admin visits dashboard → TanStack Query fetches data → Server queries database → Client renders charts and statistics
3. **Real-time Updates**: Form submissions trigger query invalidation → Dashboard automatically refreshes with new data

## External Dependencies

### Core Dependencies
- **Database**: Neon Database (serverless PostgreSQL)
- **External APIs**: Google Sheets API for data backup
- **UI Components**: Radix UI primitives for accessible components
- **Validation**: Zod for runtime type checking and form validation

### Development Dependencies
- **Replit Integration**: Cartographer plugin and runtime error overlay for Replit environment
- **Build Tools**: Vite, esbuild, TypeScript compiler
- **Code Quality**: PostCSS, Autoprefixer, Tailwind CSS

## Deployment Strategy

### Split Deployment Architecture
- **Frontend**: Deployed to Netlify at `https://gokulkumar-week-2.netlify.app`
- **Backend**: Configured for Render deployment with CORS support
- **Separation**: Clean client/server separation for better scalability and security

### Frontend (Netlify)
- Static React build served from Netlify CDN
- Environment variables: `VITE_API_URL` pointing to Render backend
- Automatic deployment from Git repository

### Backend (Render)
- Express server bundled with esbuild for optimal performance
- Environment variables: `NODE_ENV`, `GOOGLE_SERVICE_ACCOUNT_KEY`, `GOOGLE_SHEET_ID`, `DATABASE_URL`
- CORS configured for Netlify domain and development origins
- Health check endpoints for monitoring

### Build Configuration
- Frontend builds to `dist/public` directory (for local development)
- Backend bundles to `dist/index.js` with external dependencies
- Render-specific build command: `npm install && npm run build`
- Production start command: `npm start`

### Memory Storage Fallback
- MemStorage class provides in-memory storage when database is unavailable
- Maintains data persistence during development and provides graceful degradation
- Implements same interface as database storage for seamless switching

## Recent Changes

### July 21, 2025 - Render Deployment Configuration
- Fixed production build issues by creating separate production/development imports
- Created `server/production.ts` for backend-only serving without Vite dependencies
- Updated build process to work with Render's backend-only deployment
- Added comprehensive deployment guides and Google Sheets integration documentation
- Tested production build successfully - backend works independently from frontend
- CORS properly configured for Netlify frontend communication

The application is designed to be easily deployable on platforms like Replit for development, with production deployment optimized for split architecture (Netlify frontend + Render backend). The architecture supports both local development and cloud deployment scenarios with proper separation of concerns.
