import genres from "../../assets/data/genres.js";
import { Link } from "react-router";
import "./PopularGenres.css";
import { useEffect } from "react";

const PopularGenres = ({ onRenderComplete }) => {
  useEffect(() => {
    if (onRenderComplete) {
      onRenderComplete();
    }
  }, [onRenderComplete]);

  return (
    <div className="popular-genres">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-xl-4">
            <h1 className="mb-2">Popular Genres</h1>
            <p className="color-gray">
              At Visuals, you'll find a diverse range of content that's been
              neatly categorized to help you navigate.
            </p>
          </div>
          <div className="col-xl-8">
            <div className="row">
              {genres.slice(0, 8).map((genre) => (
                <div className="col-lg-3 col-md-4 col-6 my-4" key={genre.id}>
                  <div className="genre-card">
                    <Link to={`/genre/${genre.id}`} className="genre-link">
                      <img src={genre.image} alt="" />
                      <h4>{genre.name}</h4>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularGenres;
