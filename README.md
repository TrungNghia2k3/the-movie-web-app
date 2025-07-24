# 🎬 The Movie Web App

A responsive movie browsing web application built with React, focusing on user experience, performance, and comprehensive movie discovery via The Movie Database (TMDb) API.

---

## ✨ Key Features
- **Movie Discovery**: Browse movies by genres, countries, and advanced filtering options
- **Search Functionality**: Keyword-based movie search with intelligent API routing (Search vs Discover)
- **Responsive Design**: Fully responsive layout with mobile-first approach and touch/swipe navigation
- **Movie Details**: Comprehensive movie information with trailers, recommendations, and collections
- **Interactive UI**: Smooth hover effects, carousels, and mobile-optimized components
- **Data Quality Control**: Advanced filtering to ensure only complete movie data is displayed
- **Performance Optimization**: Sequential component rendering with loading states management

---

## 🛠️ Tech Stack
- **Framework:** React 19.1
- **Routing:** React Router DOM 7.6
- **Styling:** Bootstrap 5.3, SASS, Custom CSS
- **Icons:** Bootstrap Icons
- **HTTP Client:** Axios
- **Build Tool:** Create React App
- **Performance:** Web Vitals

---

## 📁 Project Structure Highlights
```
src/
├── assets/               # Static assets and shared data
│   ├── data/            # Genre, country, language data
│   ├── images/          # App images and media assets
│   └── styles/          # Global CSS styles
├── components/          # Reusable UI components
│   ├── MovieCard/       # Movie display card with hover effects
│   ├── MovieCarousel/   # Responsive movie carousel
│   ├── PanelCarousel/   # Mobile hero carousel with touch support
│   ├── Pagination/      # Smart pagination with loading states
│   └── ...              # Badge, Button, DropdownFilter, etc.
├── pages/               # Page-level components
│   ├── HomePage.js      # Landing page with sequential rendering
│   ├── MovieListing.js  # Movie discovery with filtering
│   └── MovieDetailPage/ # Individual movie details
├── sections/            # Layout sections
│   ├── Header/          # Navigation with search and dropdowns
│   ├── Hero/            # Hero banner with desktop/mobile layouts
│   ├── FilterSidebar/   # Advanced movie filtering
│   └── ...              # Footer, TrendingMovies, etc.
├── services/            # API integration
│   └── api.js           # TMDb API calls and configuration
├── utils/               # Utility functions
│   ├── movieFilters.js  # API filter conversion logic
│   ├── helpers.js       # Date/time formatting utilities
│   └── imageHelpers.js  # Image URL helpers
└── routes/              # Routing configuration
    ├── AppRoutes.js     # Route definitions
    └── AppRoutesWrapper.js # Route management with loading states
```

---

## 🎯 Core Functionality

### Movie Discovery & Filtering
- **Advanced Filtering**: Genre, country, release date, rating filters
- **Intelligent Search**: Automatic API selection (Search vs Discover) based on query type
- **Data Validation**: Comprehensive filtering to exclude incomplete movie data
- **Pagination**: Smooth pagination with loading indicators

### Responsive Design
- **Mobile Carousel**: Touch/swipe enabled hero section for mobile devices
- **Adaptive Layouts**: Different layouts for mobile, tablet, and desktop
- **Performance Optimized**: Sequential component rendering to improve perceived performance

### User Experience
- **Smooth Animations**: Enhanced hover effects and transitions
- **Loading States**: Comprehensive loading management across components
- **Error Handling**: Robust error handling for API failures
- **Accessibility**: ARIA labels and semantic HTML structure

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- TMDb API key

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd the-movie-web-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   # Create .env file in root directory
   REACT_APP_SECRET_KEY=your_tmdb_api_key_here
   ```

4. Start development server:
   ```bash
   npm start
   ```

5. Build for production:
   ```bash
   npm run build
   ```

---

## 🎨 Features Showcase

### Mobile-First Design
- **Responsive Hero**: Desktop panels transform into mobile carousel
- **Touch Navigation**: Swipe gestures for mobile carousel interaction
- **Adaptive Grids**: Responsive grid layouts for different screen sizes

### Performance Features
- **Sequential Rendering**: Components load progressively for better perceived performance
- **Optimized API Calls**: Smart caching and efficient API usage
- **Image Optimization**: Multiple image sizes based on device requirements

### Data Quality
- **Complete Movie Validation**: Ensures movies have valid images, descriptions, and release dates
- **Error Recovery**: Graceful handling of incomplete or corrupted data
- **Fallback Content**: Appropriate fallbacks for missing information

---

## 📡 API Integration
- **The Movie Database (TMDb)**: Primary data source for movies, genres, and media
- **Intelligent Routing**: Automatic selection between Search and Discover APIs
- **Rate Limiting**: Efficient API usage with proper error handling
- **Image CDN**: Optimized image delivery via TMDb's CDN

---

## 🏗️ Architecture Highlights
- **Component-Based**: Modular, reusable React components
- **State Management**: Local state with efficient prop drilling
- **Route Management**: Centralized routing with loading state coordination
- **Error Boundaries**: Comprehensive error handling and recovery
- **Performance Monitoring**: Web Vitals integration for performance tracking

---

## 📚 Purpose
This project demonstrates:
- **Modern React Development**: Latest React patterns and best practices
- **Responsive Web Design**: Mobile-first, progressive enhancement approach
- **API Integration**: Sophisticated API interaction with intelligent routing
- **Performance Optimization**: Sequential rendering and loading state management
- **User Experience**: Smooth animations, touch interactions, and accessibility
- **Code Organization**: Clean architecture with separation of concerns

---

## 📄 License
Project for educational purposes only

---

## 🎨 Design Credits
Based on Figma design: [E-commerce Website Template](https://demo.templatemonster.com/demo/349197.html)
