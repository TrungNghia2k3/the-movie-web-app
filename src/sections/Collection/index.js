import React, { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard";
import {
  getCollectionDetail,
} from "../../services/api";
import { getBackdropImageStyle } from "../../utils/imageHelpers";
import "./Collection.css";

const Collection = ({ id }) => {
  const [collectionMovies, setCollectionMovies] = useState([]);

  // Filter function to ensure movies have all necessary information
  const isMovieComplete = (movie) => {
    return (
      movie &&
      movie.id &&
      movie.title &&
      movie.backdrop_path && // Must have image
      movie.backdrop_path !== null &&
      movie.backdrop_path !== "" &&
      typeof movie.backdrop_path === 'string' && // Must be a string, not object
      movie.backdrop_path.length > 0 &&
      movie.backdrop_path !== "[object Object]" && // Filter out exact [object Object]
      !movie.backdrop_path.includes('[object Object]') && // Filter out [object Object] substring
      movie.backdrop_path.startsWith('/') && // Must be a valid path starting with /
      movie.overview && // Must have overview
      movie.overview !== "" &&
      movie.release_date && // Must have release date
      movie.release_date !== ""
    );
  };

  useEffect(() => {
    const fetchCollectionMovies = async () => {
      const movies = await getCollectionDetail(id);
      // Filter movies to only include those with complete information
      const completeMovies = (movies || []).filter(isMovieComplete);
      setCollectionMovies(completeMovies);
    };
    fetchCollectionMovies();
  }, [id]);

  if (!collectionMovies.length) {
    return null;
  }

  return (
    <section className="collection">
      <div className="container-fluid">
        <h1>Collection</h1>
        <div className="row">
          {collectionMovies.slice(0, 8).map((movie) => (
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

export default Collection;
