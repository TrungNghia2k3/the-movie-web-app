import React, { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard";
import {
  getRecentlyReleasedMovies,
} from "../../services/api";
import { getBackdropImageStyle } from "../../utils/imageHelpers";
import "./RecentlyReleased.css";

const RecentlyReleased = ({ onRenderComplete }) => {
  const [recentlyReleasedMovies, setRecentlyReleasedMovies] = useState([]);

  useEffect(() => {
    const fetchRecentlyReleasedMovies = async () => {
      const movies = await getRecentlyReleasedMovies();
      setRecentlyReleasedMovies(movies);

      // Call onRenderComplete callback
      if (onRenderComplete) {
        onRenderComplete();
      }
    };
    fetchRecentlyReleasedMovies();
  }, [onRenderComplete]);

  if (!recentlyReleasedMovies.length) {
    return null;
  }

  return (
    <section className="recently-released">
      <div className="container-fluid">
        <h1>Recently Released</h1>
        <div className="row">
          {recentlyReleasedMovies.slice(0, 8).map((movie) => (
            <div
              className="col-xl-3 col-lg-6 col-md-6 col-sm-6 my-4"
              key={movie.id}
            >
              <MovieCard
                id={movie.id}
                image={getBackdropImageStyle(movie.backdrop_path)}
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
