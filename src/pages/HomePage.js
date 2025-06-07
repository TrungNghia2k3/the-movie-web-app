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

  // States để theo dõi trạng thái render của từng component
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

  // Tạo các callback functions ổn định
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

  // Gọi onRenderComplete khi tất cả sections đã render xong
  useEffect(() => {
    if (renderStates.popularGenres && onRenderComplete) {
      onRenderComplete();
    }
  }, [renderStates.popularGenres, onRenderComplete]);

  // Check nếu data chưa load xong
  if (!animationMovies.length || !horrorMovies.length) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }

  return (
    <>
      {/* Hero - render đầu tiên */}
      <Hero onRenderComplete={onHeroComplete} />

      {/* TrendingMovies - chỉ render khi Hero đã render xong */}
      {renderStates.hero && (
        <TrendingMovies onRenderComplete={onTrendingComplete} />
      )}

      {/* RecentlyReleased - chỉ render khi TrendingMovies đã render xong */}
      {renderStates.trendingMovies && (
        <RecentlyReleased onRenderComplete={onRecentlyReleasedComplete} />
      )}

      {/* CommingSoon - chỉ render khi RecentlyReleased đã render xong */}
      {renderStates.recentlyReleased && (
        <CommingSoon onRenderComplete={onComingSoonComplete} />
      )}

      {/* Animation Carousel - chỉ render khi CommingSoon đã render xong */}
      {renderStates.commingSoon && animationMovies.length > 0 && (
        <MovieCarousel
          title="Animation"
          movies={animationMovies}
          onRenderComplete={onAnimationCarouselComplete}
        />
      )}

      {/* Horror Carousel - chỉ render khi Animation Carousel đã render xong */}
      {renderStates.animationCarousel && horrorMovies.length > 0 && (
        <MovieCarousel
          title="Horror"
          movies={horrorMovies}
          onRenderComplete={onHorrorCarouselComplete}
        />
      )}

      {/* PopularGenres - chỉ render khi Horror Carousel đã render xong */}
      {renderStates.horrorCarousel && (
        <PopularGenres onRenderComplete={onPopularGenresComplete} />
      )}
    </>
  );
};

export default HomePage;
