import React, { useEffect, useState } from "react";
import Panel from "../../components/Panel";
import PanelCarousel from "../../components/PanelCarousel";
import { BACKDROP_ORIGINAL_URL, getActionMovies } from "../../services/api";

const Hero = ({ onRenderComplete }) => {
  const [activeIndex, setActiveIndex] = useState(3);
  const [actionMovies, setActionMovies] = useState([]);
  useEffect(() => {
    const fetchActionMovies = async () => {
      const movies = await getActionMovies();
      setActionMovies(movies);

      // Call onRenderComplete callback
      if (onRenderComplete) {
        onRenderComplete();
      }
    };
    fetchActionMovies();
  }, [onRenderComplete]);

  return (
    <div className="container-fluid">
      {/* Desktop Layout */}
      <div className="row flex overflow-hidden d-none d-xl-flex">
        {actionMovies.slice(0, 5).map((movie, index) => (
          <Panel
            key={index}
            id={movie.id}
            image={BACKDROP_ORIGINAL_URL + movie.backdrop_path}
            title={movie.title}
            isActive={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      {/* Mobile Layout */}
      <div className="d-xl-none">
        <PanelCarousel
          movies={actionMovies.slice(0, 5).map((movie, index) => ({
            id: movie.id,
            image: BACKDROP_ORIGINAL_URL + movie.backdrop_path,
            title: movie.title,
          }))}
          activeIndex={activeIndex}
          onIndexChange={setActiveIndex}
        />
      </div>
    </div>
  );
};

export default Hero;
