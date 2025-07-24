import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import MovieCard from "../../components/MovieCard";
import Pagination from "../../components/Pagination";
import FilterSidebar from "../../sections/FilterSidebar";
import { BACKDROP_W780_URL, getDiscoverMovies, searchMovies } from "../../services/api";
import {
  buildApiFilters,
  buildDiscoverParams,
  buildSearchQuery,
  shouldUseSearchAPI,
} from "../../utils/movieFilters";

import "./MovieListing.css";

const MovieListing = ({ onRenderComplete }) => {
  const [searchParams] = useSearchParams();

  // URL params from navigation
  const urlGenreId = searchParams.get("genreId");
  const urlCountryCode = searchParams.get("countryCode");
  const urlKeyword = searchParams.get("keyword");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // Start with loading = true
  const [hasRendered, setHasRendered] = useState(false); // Track to avoid calling onRenderComplete multiple times

  // State to save filters from FilterSidebar
  const [activeFilters, setActiveFilters] = useState({});

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

  const handleFilterChange = (filters) => {
    console.log("Received filters:", filters);
    setActiveFilters(filters);
    setCurrentPage(1); // Reset to page 1 when filter changes
    setLoading(true); // Set loading when filter changes
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setLoading(true); // Set loading when page changes
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true); // Ensure loading = true when starting fetch

        const apiFilters = buildApiFilters(
          activeFilters,
          currentPage,
          urlGenreId,
          urlCountryCode,
          urlKeyword
        );

        console.log("API Filters:", apiFilters);

        let data;

        if (shouldUseSearchAPI(apiFilters)) {
          // Use Search API
          const query = buildSearchQuery(apiFilters);
          console.log("Using Search API with query:", query);

          if (query) {
            data = await searchMovies(query);
          } else {
            // Fallback to Discover API if no query
            const discoverParams = buildDiscoverParams(apiFilters);
            data = await getDiscoverMovies(discoverParams);
          }
        } else {
          // Use Discover API
          const discoverParams = buildDiscoverParams(apiFilters);
          console.log("Using Discover API with params:", discoverParams);
          data = await getDiscoverMovies(discoverParams);
        }

        // Filter movies to only include those with complete information
        const completeMovies = (data.results || []).filter(isMovieComplete);
        
        setMovies(completeMovies);
        setCurrentPage(data.page || 1);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error("Failed to fetch movies", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [urlGenreId, urlCountryCode, urlKeyword, currentPage, activeFilters]);

  // Effect to handle onRenderComplete
  useEffect(() => {
    // Only call onRenderComplete when:
    // 1. Not loading
    // 2. Has not called onRenderComplete before (to avoid multiple calls)
    // 3. Component has mounted
    if (!loading && !hasRendered && onRenderComplete) {
      console.log("MovieListing render complete, calling onRenderComplete");
      onRenderComplete();
      setHasRendered(true);
    }
  }, [loading, hasRendered, onRenderComplete]);

  // Reset hasRendered when URL params change (to allow onRenderComplete to be called for new route)
  useEffect(() => {
    setHasRendered(false);
  }, [urlGenreId, urlCountryCode, urlKeyword]);

  // Loading state
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="listing-container">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-3 col-lg-12 col-md-12">
            <FilterSidebar onFilterChange={handleFilterChange} />
          </div>
          <div className="col-xl-9 col-lg-12 col-md-12">
            {/* Show current filter info */}
            <div className="mb-3">
              <p className="text-muted">
                {urlKeyword && `Searching for: "${urlKeyword}"`}
                {urlGenreId && ` | Genre ID: ${urlGenreId}`}
                {urlCountryCode && ` | Country: ${urlCountryCode}`}
                {activeFilters.letter &&
                  activeFilters.letter !== "All" &&
                  ` | Letter: ${activeFilters.letter}`}
              </p>
            </div>

            <div className="row">
              {movies.length > 0 ? (
                <>
                  {movies.map((movie) => (
                    <div className="col-xl-4 col-lg-6 col-md-6" key={movie.id}>
                      <MovieCard
                        id={movie.id}
                        image={BACKDROP_W780_URL + movie.backdrop_path}
                        title={movie.title}
                      />
                    </div>
                  ))}

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              ) : (
                <div className="col-12 text-center">
                  <p className="text-muted">No movies found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieListing;
