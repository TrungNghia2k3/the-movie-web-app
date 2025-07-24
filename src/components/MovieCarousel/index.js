import React, { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard";
import { BACKDROP_W780_URL } from "../../services/api";
import "./MovieCarousel.css";

const MovieCarousel = ({ title, movies, onRenderComplete }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [screenSize, setScreenSize] = useState('desktop');

  // Check screen size and set appropriate values
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width <= 575.98) {
        setScreenSize('mobile');
      } else if (width <= 991.98) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Call onRenderComplete once when component mounts
  useEffect(() => {
    if (onRenderComplete) {
      onRenderComplete();
    }
  }, [onRenderComplete]); // Empty dependency array - runs only once when mounted

  const getItemsPerPage = () => {
    switch (screenSize) {
      case 'mobile': return 1;
      case 'tablet': return 2;
      default: return 4;
    }
  };

  const itemsPerPage = getItemsPerPage();
  const maxIndex = Math.max(0, movies.length - itemsPerPage);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const visibleMovies = movies.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="movie-carousel">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="carousel-title">{title}</h1>
        <div className="nav-buttons">
          <button
            className="nav-btn"
            onClick={handlePrev}
            disabled={startIndex === 0}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <button
            className="nav-btn"
            onClick={handleNext}
            disabled={startIndex >= maxIndex}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>

      {/* Movie list */}
      <div className="movie-list">
        {visibleMovies.map((movie) => (
          <div key={movie.id} className="movie-item">
            <MovieCard
              id={movie.id}
              image={BACKDROP_W780_URL + movie.backdrop_path}
              title={movie.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;
