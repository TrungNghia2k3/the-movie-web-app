import React, { useEffect, useState } from "react";
import { getMovieDetail, getMovieTrailer } from "../../services/api";
import { convertMinutesToHourMinute } from "../../utils/helpers";
import Badge from "../Badge";
import Button from "../Button";
import WatchTrailerModal from "../WatchTrailerModal";
import "./MovieCard.css";

const MovieCard = ({ id, image, title }) => {
  const [trailer, setTrailer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [movieDetail, setMovieDetail] = useState(null);

  const handleWatchTrailerClick = async () => {
    const trailers = await getMovieTrailer(id);
    const trailer = trailers.find((trailer) => trailer.type === "Trailer");
    setTrailer(trailer);
    setShowModal(true);
  };

  useEffect(() => {
    const fetchMovieDetail = async () => {
      const detail = await getMovieDetail(id);
      setMovieDetail(detail);
    };
    fetchMovieDetail();
  }, [id]);

  return (
    <>
      <div className="movie-card">

        {/* Movie Image */}
        <div className="image-wrapper">
          <img src={image} alt={title} />
        </div>

        {/* Movie Details */}
        <div className="content">
          <h3 className="mb-2 fs-3">{title}</h3>

          <div className="badge-list">
            <Badge
              adult={movieDetail?.adult}
              status={movieDetail?.status}
              vote_average={movieDetail?.vote_average}
            />
          </div>

          <div className="runtime d-flex gap-2 my-1">
            <h6 className=" fw-bold">Movie</h6>
            <h6 className=" fw-bold">
              {convertMinutesToHourMinute(movieDetail?.runtime)}
            </h6>
          </div>

          <div className="button-list d-flex gap-2">
            <Button
              icon="bi bi-play"
              text="Watch Trailer"
              variant="light"
              onClick={handleWatchTrailerClick}
            />

            <Button
              icon="bi bi-info-circle"
              text="More Info"
              variant="light"
              outline
              link={`/movie/${id}`}
            />
          </div>
        </div>
      </div>

      <WatchTrailerModal
        show={showModal}
        onClose={() => setShowModal(false)}
        trailerKey={trailer?.key}
        title={title}
      />
    </>
  );
};

export default MovieCard;
