import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import MovieCarousel from "../../components/MovieCarousel";
import WatchTrailerModal from "../../components/WatchTrailerModal";
import Collection from "../../sections/Collection";
import {
  BACKDROP_W1280_URL,
  getMovieDetail,
  getMovieTrailer,
  getRecommendMovies,
} from "../../services/api";
import {
  convertDateToLocaleDateString,
  convertMinutesToHourMinute,
} from "../../utils/helpers";
import "./MovieDetailPage.css";

const MovieDetailPage = ({ onRenderComplete }) => {
  const { id } = useParams();

  const [movieDetail, setMovieDetail] = useState(null);
  const [trailer, setTrailer] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [recommendMovies, setRecommendMovies] = useState([]);

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
    const fetchMovieDetail = async () => {
      try {
        const detail = await getMovieDetail(id);
        const trailers = await getMovieTrailer(id);
        const trailer = trailers?.find((trailer) => trailer.type === "Trailer");
        const recommendMoviesData = await getRecommendMovies(id);

        // Filter recommended movies to only include those with complete information
        const completeRecommendMovies = (recommendMoviesData || []).filter(isMovieComplete);

        setMovieDetail(detail);
        setTrailer(trailer);
        setRecommendMovies(completeRecommendMovies);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    if (id) {
      fetchMovieDetail();
    }
  }, [id]);

  const handleWatchTrailer = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (recommendMovies.length > 0) {
      onRenderComplete();
    }
  }, [recommendMovies, onRenderComplete]);

  if (!movieDetail) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }

  return (
    <section className="movie-detail">
      <div className="movie-detail-banner">
        <div
          className="blur-background"
          style={{
            backgroundImage: `url(${
              BACKDROP_W1280_URL + movieDetail.backdrop_path
            })`,
          }}
        ></div>
        <div className="container-fluid">
          <div className="row">
            {/* Left side - Movie Poster with Play Button */}
            <div className="col-xl-8">
              <div className="row">
                {/* Left side - Movie Poster with Play Button */}
                <div className="col-xl-6 col-lg-12 col-md-12 movie-poster-container">
                  <div className="trailer-box position-relative">
                    <img
                      src={BACKDROP_W1280_URL + movieDetail.backdrop_path}
                      alt={movieDetail.title}
                      className="movie-poster img-fluid"
                    />
                    <div
                      className="trailer-overlay position-absolute d-flex align-items-center justify-content-center"
                      onClick={handleWatchTrailer}
                    >
                      <button className="btn text-white d-flex flex-column align-items-center trailer-btn">
                        <div className="play-icon mb-2 d-flex align-items-center justify-content-center">
                          <i className="bi bi-play-fill" />
                        </div>
                        <h5 className="text-white mb-0">Watch Trailer</h5>
                      </button>
                    </div>
                  </div>

                  {/* Right side - Movie Content */}
                </div>
                <div className="col-xl-6 col-lg-12 col-md-12 movie-content-container">
                  <div className="movie-content text-white">
                    <h1 className="movie-title mb-3">{movieDetail.title}</h1>
                    <p className="movie-overview mb-4">
                      {movieDetail.overview}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Movie Info */}
            <div className="col-xl-4">
              <div className="about-list">
                <h3 className="text-white fw-bold fs-3">About</h3>
                <div className="about-info fw-semibold">
                  <div className="info-item">
                    <div className="text-light">Type:</div>
                    <div className="text-success-custom">Movie</div>
                  </div>

                  <div className="info-item">
                    <div className="text-light">Studio:</div>
                    <div className="text-success-custom">
                      {movieDetail.production_companies?.length > 0
                        ? movieDetail.production_companies
                            .slice(0, 2)
                            .map((company) => company.name)
                            .join(", ")
                        : "N/A"}
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="text-light">Date aired:</div>
                    <div className="text-white">
                      {convertDateToLocaleDateString(movieDetail.release_date)}
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="text-light">Status:</div>
                    <div className="text-success-custom">
                      {movieDetail.status}
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="text-light">Genre:</div>
                    <div className="text-white">
                      {movieDetail.genres
                        ?.map((genre) => genre.name)
                        .join(", ")}
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="text-light">Country:</div>
                    <div className="text-white">
                      {movieDetail.production_countries?.length > 0
                        ? movieDetail.production_countries
                            .map((country) => country.name)
                            .join(", ")
                        : "N/A"}
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="text-light">Premiered:</div>
                    <div className="text-white">
                      {movieDetail.vote_average?.toFixed(1)} by{" "}
                      {movieDetail.vote_count?.toLocaleString()} reviews
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="text-light">Duration:</div>
                    <div className="text-white">
                      {convertMinutesToHourMinute(movieDetail.runtime)}
                    </div>
                  </div>

                  <div className="info-item d-flex align-items-center">
                    <i className="bi bi-eye text-light fs-4"></i>
                    <span className="text-white">
                      {movieDetail.popularity?.toLocaleString()} Views
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Modal */}
          {showModal && (
            <WatchTrailerModal
              show={showModal}
              onClose={handleCloseModal}
              trailerKey={trailer.key}
              title={movieDetail.title}
            />
          )}
        </div>
      </div>

      {movieDetail.belongs_to_collection && <div className="container-fluid">
        <Collection id={movieDetail.belongs_to_collection.id} />
      </div>}

      <div className="container-fluid">
        <MovieCarousel
          title="Recommended Movies"
          movies={recommendMovies}
          onRenderComplete={() => {}}
        />
      </div>
    </section>
  );
};

export default MovieDetailPage;
