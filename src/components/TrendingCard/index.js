import React, { useState } from "react";
import { getMovieTrailer } from "../../services/api";
import Button from "../Button";
import WatchTrailerModal from "../WatchTrailerModal";
import "./TrendingCard.css";

const TrendingCard = ({ id, number, trendingImage, title }) => {
  const [trailer, setTrailer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleWatchTrailerClick = async () => {
    const trailers = await getMovieTrailer(id);
    const trailer = trailers.find((trailer) => trailer.type === "Trailer");
    setTrailer(trailer);
    setShowModal(true);
  };

  const handleImageTouch = () => {
    setIsHovered(!isHovered);
  };

  return (

    <div className="col-xl-6 p-0">
      <div className="trend-block">
        <div className="row">
          {/* Text Block */}
          <div className="col-sm-6 p-0">
            <div className="text">
              <h4>TRENDING</h4>
              <h2 style={{ backgroundImage: `url(${trendingImage})` }}>
                {number}
              </h2>
            </div>
          </div>

          {/* Image Block */}
          <div className="col-sm-6 p-0">
            <div 
              className={`img-block ${isHovered ? 'hovered' : ''}`}
              onClick={handleImageTouch}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img src={trendingImage} alt="" />
              {/* Overlay */}
              <div className="overlay"></div>

              {/* Button Block */}
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
