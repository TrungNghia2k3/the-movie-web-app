import React, { useEffect, useState } from "react";
import {
  getMovieDetail,
  getMovieTrailer,
  getMovieCredits,
  BACKDROP_W1280_URL,
  getUpcomingMovies,
} from "../../services/api";
import { convertMinutesToHourMinute } from "../../utils/helpers";
import "./CommingSoon.css";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import WatchTrailerModal from "../../components/WatchTrailerModal";

const CommingSoon = ({onRenderComplete}) => {
  const [highlightMovie, setHighlightMovie] = useState(null);
  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const [trailer, setTrailer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch movie details
  useEffect(() => {
    const fetchUpcomingMovieData = async () => {
      try {
        const upcomingMovies = await getUpcomingMovies();

        for (const movie of upcomingMovies) {
          // Kiểm tra các trường cần thiết
          if (
            !movie.title ||
            !movie.overview ||
            !movie.release_date ||
            !movie.backdrop_path
          ) {
            continue;
          }

          // Lấy trailer
          const trailerData = await getMovieTrailer(movie.id);
          if (!trailerData || trailerData.length === 0) {
            continue;
          }

          // Nếu có trailer, lấy chi tiết & credits
          const detail = await getMovieDetail(movie.id);
          const credits = await getMovieCredits(movie.id);

          const director = credits.crew.find(
            (member) => member.job === "Director"
          );

          setHighlightMovie({
            ...detail,
            trailer: trailerData,
            director: director ? director.name : "Unknown",
          });

          break; // Thoát khỏi vòng lặp khi đã chọn được phim phù hợp
        }
      } catch (error) {
        console.error("Error fetching upcoming movie data", error);
      }
    };

    fetchUpcomingMovieData();
  }, []);

  // Gọi onRenderComplete khi component đã render xong và có data
  useEffect(() => {
    if (highlightMovie && onRenderComplete) {
      onRenderComplete();
    }
  }, [highlightMovie, onRenderComplete]); // Chỉ depend vào highlightMovie

  // Countdown logic
  useEffect(() => {
    if (!highlightMovie) return;

    const calculateCountdown = () => {
      const releaseDate = new Date(highlightMovie.release_date).getTime();
      const now = new Date().getTime();
      const distance = releaseDate - now;

      if (distance <= 0) return;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown({
        days: days.toString().padStart(2, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [highlightMovie]);

  const handleWatchTrailerClick = async () => {
    const trailers = await getMovieTrailer(highlightMovie.id);
    const trailer = trailers.find((trailer) => trailer.type === "Trailer");
    setTrailer(trailer);
    setShowModal(true);
  };

  if (!highlightMovie) return null;

  return (
    <section className="coming-soon position-relative overflow-hidden">
      <div
        className="blur-background"
        style={{
          backgroundImage: `url(${
            BACKDROP_W1280_URL + highlightMovie.backdrop_path
          })`,
        }}
      ></div>

      <div className="container-fluid position-relative">
        <div className="row">
          <div className="col-xl-4 col-lg-6 coming-soon-left">
            <div className="coming-soon-top-title">
              <h4>Coming Soon</h4>
            </div>
            <div className="coming-soon-content text-white">
              <h1 className="mt-5">{highlightMovie.title}</h1>
              <p>{highlightMovie.overview}</p>

              <div className="badge-list my-2">
                <Badge
                  adult={highlightMovie?.adult}
                  status={highlightMovie?.status}
                  vote_average={highlightMovie?.vote_average}
                />
              </div>

              <div className="runtime d-flex gap-2 my-2">
                <h5 className=" fw-bold">Movie</h5>
                <h5 className=" fw-bold">
                  {convertMinutesToHourMinute(highlightMovie?.runtime)}
                </h5>
              </div>

              <h5 className="my-2">
                <span className="text-success fw-bold">Director:</span>{" "}
                {highlightMovie.director}
              </h5>

              <div className="button-list d-flex gap-2 my-4">
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
                  link={`/movie/${highlightMovie.id}`}
                />
              </div>

              <ul className="p-0 countdown-timer d-flex gap-4">
                <li className="time-block text-center">
                  <span className="time-value">{countdown.days}</span>
                  <span className="time-label">Days</span>
                </li>
                <li className="time-block text-center">
                  <span className="time-value">{countdown.hours}</span>
                  <span className="time-label">Hrs</span>
                </li>
                <li className="time-block text-center">
                  <div className="time-value">{countdown.minutes}</div>
                  <span className="time-label">Min</span>
                </li>
                <li className="time-block text-center">
                  <div className="time-value">{countdown.seconds}</div>
                  <span className="time-label">Sec</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xl-8 col-lg-6">
            <img
              className="img-fluid w-100 rounded-5 p-4"
              src={BACKDROP_W1280_URL + highlightMovie.backdrop_path}
              alt={highlightMovie.title}
            />
          </div>
        </div>

        <WatchTrailerModal
          show={showModal}
          onClose={() => setShowModal(false)}
          trailerKey={trailer?.key}
          title={highlightMovie.title}
        />
      </div>
    </section>
  );
};

export default CommingSoon;
