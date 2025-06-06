import React, { useEffect, useState } from "react";
import Panel from "../../components/Panel";
import { getActionMovies } from "../../services/api";
import { BACKDROP_ORIGINAL_URL } from "../../services/api";

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(3);
  const [actionMovies, setActionMovies] = useState([]);
  useEffect(() => {
    const fetchActionMovies = async () => {
      const movies = await getActionMovies();
      setActionMovies(movies);
    };
    fetchActionMovies();
  }, []);

  return (
    <div className="d-flex">
      {actionMovies.slice(0, 7).map((movie, index) => (
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
  );
};

export default Hero;
