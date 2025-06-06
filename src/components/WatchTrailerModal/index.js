import React, { useEffect } from "react";

const WatchTrailerModal = ({ show, onClose, trailerKey, title }) => {
  const YOUTUBE_URL = `https://www.youtube.com/embed/${trailerKey}`;

  useEffect(() => {
    if (show) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.classList.add("overflow-hidden");
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.classList.remove("overflow-hidden");
      document.body.style.paddingRight = "0px";
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
      document.body.style.paddingRight = "0px";
    };
  }, [show]);

  if (!show || !trailerKey) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">
          <div
            className="modal-header text-white border-0 rounded-0"
            style={{ backgroundColor: "#000000" }}
          >
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div
            className="modal-body p-3"
            style={{ backgroundColor: "#000000" }}
          >
            <div className="ratio ratio-16x9">
              <iframe
                src={YOUTUBE_URL}
                title="YouTube trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchTrailerModal;
