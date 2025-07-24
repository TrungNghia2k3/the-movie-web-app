import React, { useState, useEffect, useCallback } from "react";
import Hero from "../sections/Hero";
import TrendingMovies from "../sections/TrendingMovies";
import RecentlyReleased from "../sections/RecentlyReleased";
import CommingSoon from "../sections/CommingSoon";
import MovieCarousel from "../components/MovieCarousel";
import { getMoviesWithGenres } from "../services/api";
import PopularGenres from "../sections/PopularGenres";

const HomePage = ({ onRenderComplete }) => {
  const [animationMovies, setAnimationMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);

  // States to track the render status of each component
  const [renderStates, setRenderStates] = useState({
    hero: false,
    trendingMovies: false,
    recentlyReleased: false,
    commingSoon: false,
    animationCarousel: false,
    horrorCarousel: false,
    popularGenres: false,
  });

  // Fetch movies data
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const animationMovies = await getMoviesWithGenres("16");
        const horrorMovies = await getMoviesWithGenres("27");
        setAnimationMovies(animationMovies);
        setHorrorMovies(horrorMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  // Create stable callback functions
  const onHeroComplete = useCallback(() => {
    setRenderStates((prev) => ({ ...prev, hero: true }));
  }, []);

  const onTrendingComplete = useCallback(() => {
    setRenderStates((prev) => ({ ...prev, trendingMovies: true }));
  }, []);

  const onRecentlyReleasedComplete = useCallback(() => {
    setRenderStates((prev) => ({ ...prev, recentlyReleased: true }));
  }, []);

  const onComingSoonComplete = useCallback(() => {
    setRenderStates((prev) => ({ ...prev, commingSoon: true }));
  }, []);

  const onAnimationCarouselComplete = useCallback(() => {
    setRenderStates((prev) => ({ ...prev, animationCarousel: true }));
  }, []);

  const onHorrorCarouselComplete = useCallback(() => {
    setRenderStates((prev) => ({ ...prev, horrorCarousel: true }));
  }, []);

  const onPopularGenresComplete = useCallback(() => {
    setRenderStates((prev) => ({ ...prev, popularGenres: true }));
  }, []);

  // Call onRenderComplete when all sections are rendered
  useEffect(() => {
    if (renderStates.popularGenres && onRenderComplete) {
      onRenderComplete();
    }
  }, [renderStates.popularGenres, onRenderComplete]);

  // Check if data is still loading
  if (!animationMovies.length || !horrorMovies.length) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }

  return (
    <>
      {/* Hero - render first */}
      <Hero onRenderComplete={onHeroComplete} />

      {/* TrendingMovies - only render when Hero is rendered */}
      {renderStates.hero && (
        <TrendingMovies onRenderComplete={onTrendingComplete} />
      )}

      {/* RecentlyReleased - only render when TrendingMovies is rendered */}
      {renderStates.trendingMovies && (
        <RecentlyReleased onRenderComplete={onRecentlyReleasedComplete} />
      )}

      {/* CommingSoon - only render when RecentlyReleased is rendered */}
      {renderStates.recentlyReleased && (
        <CommingSoon onRenderComplete={onComingSoonComplete} />
      )}

      {/* Animation Carousel - only render when CommingSoon is rendered */}
      {renderStates.commingSoon && animationMovies.length > 0 && (
        <MovieCarousel
          title="Animation"
          movies={animationMovies}
          onRenderComplete={onAnimationCarouselComplete}
        />
      )}

      {/* Horror Carousel - only render when Animation Carousel is rendered */}
      {renderStates.animationCarousel && horrorMovies.length > 0 && (
        <MovieCarousel
          title="Horror"
          movies={horrorMovies}
          onRenderComplete={onHorrorCarouselComplete}
        />
      )}

      {/* PopularGenres - only render when Horror Carousel is rendered */}
      {renderStates.horrorCarousel && (
        <PopularGenres onRenderComplete={onPopularGenresComplete} />
      )}
    </>
  );
};

export default HomePage;
