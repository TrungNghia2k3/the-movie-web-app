import React, { useEffect, useState } from "react";
import TrendingCard from "../../components/TrendingCard";
import { getMovieTrending } from "../../services/api";
import { BACKDROP_W780_URL } from "../../services/api";
import "./TrendingShows.css";

const TrendingShows = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const movies = await getMovieTrending();
      setTrendingMovies(movies);
    };
    fetchTrendingMovies();
  }, []);

  return (
    <section className="trending-shows">
      <div className="container-fluid">
        <h2>Trending Animation Movies</h2>
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
