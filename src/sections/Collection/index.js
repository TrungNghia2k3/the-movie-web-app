import React, { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard";
import {
  getCollectionDetail,
} from "../../services/api";
import { getBackdropImageStyle } from "../../utils/imageHelpers";
import "./Collection.css";

const Collection = ({ id }) => {
  const [collectionMovies, setCollectionMovies] = useState([]);

  useEffect(() => {
    const fetchCollectionMovies = async () => {
      const movies = await getCollectionDetail(id);
      setCollectionMovies(movies);
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
              className="col-xl-3 col-lg-4 col-md-6 col-sm-6 my-4"
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
