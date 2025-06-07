import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import {
  getActionMovies,
  getDiscoverMovies,
  searchMovies,
} from "../services/api";
import FilterSidebar from "../sections/FilterSidebar";
import { BACKDROP_W780_URL } from "../services/api";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

const MovieListing = () => {
  const [searchParams] = useSearchParams();
  const genreId = searchParams.get("genreId");
  const countryCode = searchParams.get("countryCode");
  const keyword = searchParams.get("keyword");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [movies, setMovies] = useState([]);

  const handleFilterChange = (filters) => {
    console.log(filters);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        getDiscoverMovies({
          genreId,
          countryCode,
          keyword,
          page: currentPage,
        }).then((data) => {
          setMovies(data.results);
          setTotalPages(data.total_pages);
          setCurrentPage(data.page);
        });
      } catch (error) {
        console.error("Failed to fetch movies", error);
      }
    };

    fetchMovies();
  }, [genreId, countryCode, keyword, currentPage]);

  // Check nếu data chưa load xong
  if (!movies.length) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }

  return (
    <div className="listing-container" style={{ padding: "80px" }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-3 col-lg-4 col-md-5">
            <FilterSidebar onFilterChange={handleFilterChange} />
          </div>
          <div className="col-xl-9 col-lg-8 col-md-7">
            <div className="row">
              {movies.map((movie) => (
                <div className="col-xl-4 col-lg-6 col-md-6" key={movie.id}>
                  <MovieCard
                    id={movie.id}
                    image={BACKDROP_W780_URL + movie.backdrop_path}
                    title={movie.title}
                  />
                </div>
              ))}

              {/* <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                maxVisiblePages={5}
                showFirstLast={true}
                showPrevNext={true}
                size="lg"
                className=""
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieListing;
