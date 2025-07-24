import React, { useState, useRef, useEffect } from 'react';
import Panel from '../Panel';
import './PanelCarousel.css';

const PanelCarousel = ({ movies, activeIndex, onIndexChange }) => {
  const [currentIndex, setCurrentIndex] = useState(activeIndex);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    setCurrentIndex(activeIndex);
  }, [activeIndex]);

  // Handle touch start
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
  };

  // Handle touch move
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX);
  };

  // Handle touch end
  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const deltaX = currentX - startX;
    const threshold = 50; // Minimum swipe distance

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        // Swipe right - go to previous
        goToPrevious();
      } else {
        // Swipe left - go to next
        goToNext();
      }
    }

    setStartX(0);
    setCurrentX(0);
  };

  // Handle mouse events for desktop testing
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setCurrentX(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const deltaX = currentX - startX;
    const threshold = 50;

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    }

    setStartX(0);
    setCurrentX(0);
  };

  const goToNext = () => {
    const nextIndex = currentIndex < movies.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(nextIndex);
    onIndexChange(nextIndex);
  };

  const goToPrevious = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : movies.length - 1;
    setCurrentIndex(prevIndex);
    onIndexChange(prevIndex);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    onIndexChange(index);
  };

  return (
    <div className="panel-carousel-mobile">
      <div
        className="panel-carousel-container"
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="panel-carousel-track"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out',
          }}
        >
          {movies.map((movie, index) => (
            <div key={index} className="panel-carousel-slide">
              <Panel
                id={movie.id}
                image={movie.image}
                title={movie.title}
                isActive={true} // Always active in mobile view
                onClick={() => {}} // Disable click in mobile carousel
              />
            </div>
          ))}
        </div>
      </div>

      {/* Medium Devices (≥768px) */}
      {/* Navigation dots */}
      <div className="panel-carousel-dots d-none d-md-flex">
        {movies.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        className="carousel-nav carousel-nav-prev d-none d-md-block"
        onClick={goToPrevious}
        disabled={movies.length <= 1}
      >
        <i className="bi bi-chevron-left"></i>
      </button>
      <button
        className="carousel-nav carousel-nav-next d-none d-md-block"
        onClick={goToNext}
        disabled={movies.length <= 1}
      >
        <i className="bi bi-chevron-right"></i>
      </button>
    </div>
  );
};

export default PanelCarousel;
