import React, { useEffect, useState } from "react";
import TrendingCard from "../../components/TrendingCard";
import { BACKDROP_W780_URL, getMovieTrending } from "../../services/api";
import "./TrendingShows.css";

const TrendingShows = ({ onRenderComplete }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const movies = await getMovieTrending();
      setTrendingMovies(movies);

      // Call onRenderComplete callback
      if (onRenderComplete) {
        onRenderComplete();
      }
    };
    fetchTrendingMovies();
  }, [onRenderComplete]);

  return (
    <section className="trending-shows">
      <div className="container-fluid">
        <h1>Trending</h1>
        <div className="row">
          {trendingMovies.slice(0, 10).map((movie, index) => (
            <TrendingCard
              key={index}
              id={movie.id}
              number={String(index + 1).padStart(2, "0")}
              trendingImage={BACKDROP_W780_URL + movie.backdrop_path}
              title={movie.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingShows;
