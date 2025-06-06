import React, { useState } from "react";
import Hero from "../sections/Hero";
import TrendingShows from "../sections/TrendingShows";
import RecentlyReleased from "../sections/RecentlyReleased";
import CommingSoon from "../sections/CommingSoon";
import MovieCarousel from "../components/MovieCarousel";
import { getMoviesWithGenres } from "../services/api";
import PopularGenres from "../sections/PopularGenres";
import { useEffect } from "react";

const Movie = () => {
  const [animationMovies, setAnimationMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const animationMovies = await getMoviesWithGenres("16");
      const horrorMovies = await getMoviesWithGenres("27");
      setAnimationMovies(animationMovies);
      setHorrorMovies(horrorMovies);
    };
    fetchMovies();
  }, []);

  return (
    <>
      <Hero />
      <TrendingShows />
      <RecentlyReleased />
      <CommingSoon />
      <MovieCarousel title="Animation" movies={animationMovies} />
      <MovieCarousel title="Horror" movies={horrorMovies} />
      <PopularGenres />
    </>
  );
};

export default Movie;
