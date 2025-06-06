import React, { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard";
import {
  getRecentlyReleasedMovies,
  BACKDROP_W780_URL,
} from "../../services/api";
import "./RecentlyReleased.css";

const RecentlyReleased = () => {
  const [recentlyReleasedMovies, setRecentlyReleasedMovies] = useState([]);

  useEffect(() => {
    const fetchRecentlyReleasedMovies = async () => {
      const movies = await getRecentlyReleasedMovies();
      setRecentlyReleasedMovies(movies);
    };
    fetchRecentlyReleasedMovies();
  }, []);

  return (
    <section className="recently-released">
      <div className="container-fluid">
        <h2>Recently Released</h2>
        <div className="row">
          {recentlyReleasedMovies.slice(0, 8).map((movie) => (
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 my-4" key={movie.id}>
              <MovieCard
                id={movie.id}
                image={BACKDROP_W780_URL + movie.backdrop_path}
                title={movie.title}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyReleased;
