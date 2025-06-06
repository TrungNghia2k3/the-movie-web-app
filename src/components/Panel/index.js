import "./Panel.css";
import Button from "../Button";
import { getMovieDetail, getMovieTrailer } from "../../services/api";
import WatchTrailerModal from "../WatchTrailerModal";
import { useEffect, useState } from "react";
import Badge from "../Badge";
import { convertMinutesToHourMinute } from "../../utils/helpers";

const Panel = ({ id, image, title, isActive, onClick }) => {
  const [trailer, setTrailer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [movieDetail, setMovieDetail] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      const detail = await getMovieDetail(id);
      setMovieDetail(detail);
    };
    fetchMovieDetail();
  }, [id]);

  const handleWatchTrailerClick = async () => {
    const trailers = await getMovieTrailer(id);
    const trailer = trailers.find((trailer) => trailer.type === "Trailer");
    setTrailer(trailer);
    setShowModal(true);
  };

  return (
    <div
      className={`panel ${isActive ? "active" : ""}`}
      style={{ backgroundImage: `url(${image})` }}
      onClick={onClick}
    >
      <h2>{title}</h2>

      <div className="badge-list">
        <Badge
          adult={movieDetail?.adult}
          status={movieDetail?.status}
          vote_average={movieDetail?.vote_average}
        />
      </div>

      <div className="runtime d-flex gap-2">
        <h6 className=" fw-bold">Movie</h6>
        <h6 className=" fw-bold">{convertMinutesToHourMinute(movieDetail?.runtime)}</h6>
      </div>

      <div className="button-list d-flex gap-2">
        <Button
          icon="bi bi-play"
          text="Watch Trailer"
          variant="light"
          size="lg"
          onClick={handleWatchTrailerClick}
        />

        <Button
          icon="bi bi-info-circle"
          text="More Info"
          variant="light"
          outline
          size="lg"
          link={`/movie/${id}`}
        />
      </div>

      <WatchTrailerModal
        show={showModal}
        onClose={() => setShowModal(false)}
        trailerKey={trailer?.key}
        title={title}
      />
    </div>
  );
};

export default Panel;
