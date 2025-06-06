import React from "react";
import "./TrendingCard.css";
import Button from "../Button";
import { getMovieTrailer } from "../../services/api";
import { useState } from "react";
import WatchTrailerModal from "../WatchTrailerModal";

const TrendingCard = ({ id, number, trendingImage, title }) => {
  const [trailer, setTrailer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleWatchTrailerClick = async () => {
    const trailers = await getMovieTrailer(id);
    const trailer = trailers.find((trailer) => trailer.type === "Trailer");
    setTrailer(trailer);
    setShowModal(true);
  };

  return (
    <div className="col-xl-6 ">
      <div className="trend-block">
        <div className="row">
          <div className="col-sm-6 pe-0">
            <div className="text">
              <h4>TRENDING</h4>
              <h2 style={{ backgroundImage: `url(${trendingImage})` }}>
                {number}
              </h2>
            </div>
          </div>
          <div className="col-sm-6 ps-0">
            <div className="img-block">
              <img src={trendingImage} alt="" />
              <div className="overlay"></div>
              <div className="btn-block">
                <Button
                  icon="bi bi-play"
                  text="Watch Trailer"
                  variant="light"
                  size="lg"
                  onClick={handleWatchTrailerClick}
                />
              </div>
            </div>
          </div>
        </div>
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

export default TrendingCard;
