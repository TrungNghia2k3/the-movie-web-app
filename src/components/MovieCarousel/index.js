import React, { useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard";
import "./MovieCarousel.css";
import { BACKDROP_W780_URL } from "../../services/api";

const MovieCarousel = ({ title, movies, onRenderComplete }) => {
  const [startIndex, setStartIndex] = useState(0);

  // Gọi onRenderComplete một lần khi component mount
  useEffect(() => {
    if (onRenderComplete) {
      onRenderComplete();
    }
  }, [onRenderComplete]); // Empty dependency array - chỉ chạy một lần khi mount

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 1, movies.length - 4));
  };

  const visibleMovies = movies.slice(startIndex, startIndex + 4);

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
            disabled={startIndex >= movies.length - 4}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>

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
