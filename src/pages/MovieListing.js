import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { getDiscoverMovies, searchMovies } from "../services/api";
import FilterSidebar from "../sections/FilterSidebar";
import { BACKDROP_W780_URL } from "../services/api";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

const MovieListing = ({ onRenderComplete }) => {
  const [searchParams] = useSearchParams();

  // URL params từ navigation
  const urlGenreId = searchParams.get("genreId");
  const urlCountryCode = searchParams.get("countryCode");
  const urlKeyword = searchParams.get("keyword");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // Bắt đầu với loading = true
  const [hasRendered, setHasRendered] = useState(false); // Track để tránh gọi onRenderComplete nhiều lần

  // State để lưu filters từ FilterSidebar
  const [activeFilters, setActiveFilters] = useState({});

  const handleFilterChange = (filters) => {
    console.log("Received filters:", filters);
    setActiveFilters(filters);
    setCurrentPage(1); // Reset về trang 1 khi filter thay đổi
    setLoading(true); // Set loading khi filter thay đổi
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setLoading(true); // Set loading khi đổi trang
  };

  // Function để merge URL params với active filters
  const buildApiFilters = () => {
    const apiFilters = { ...activeFilters };

    // Add page
    apiFilters.page = currentPage;

    // Merge URL params vào filters (URL params có priority thấp hơn activeFilters)
    if (urlGenreId && !apiFilters.genre?.length) {
      apiFilters.with_genres = urlGenreId;
    }

    if (urlCountryCode && !apiFilters.country?.length) {
      apiFilters.with_origin_country = urlCountryCode;
    }

    // Keyword từ URL sẽ override letter filter
    if (urlKeyword) {
      apiFilters.keyword = urlKeyword;
      // Remove letter nếu có keyword từ URL
      delete apiFilters.letter;
    }

    return apiFilters;
  };

  // Function để quyết định dùng API nào
  const shouldUseSearchAPI = (filters) => {
    // Dùng Search API khi:
    // 1. Có letter filter (alphabetic search)
    // 2. Có keyword từ URL params
    return !!(filters.letter || filters.keyword);
  };

  // Function để build search query cho Search API
  const buildSearchQuery = (filters) => {
    if (filters.keyword) {
      return filters.keyword; // Keyword từ URL
    }

    if (filters.letter) {
      // Convert letter thành search query
      // Ví dụ: "A" -> search movies bắt đầu bằng "A"
      return filters.letter;
    }

    return "";
  };

  // Function để build params cho Discover API
  const buildDiscoverParams = (filters) => {
    const params = {};

    // Map converted filters sang TMDB API params
    if (filters.genre?.length) {
      params.with_genres = filters.genre.join(","); // TMDB cần comma-separated
    }

    if (filters.country?.length) {
      params.with_origin_country = filters.country[0]; // Chỉ 1 country
    }

    if (filters.year?.length) {
      params.primary_release_year = filters.year[0]; // Chỉ 1 year
    }

    if (filters.type?.length) {
      params.with_release_type = filters.type.join(","); // TMDB cần comma-separated
    }

    if (filters.language?.length) {
      params.with_original_language = filters.language[0]; // Chỉ 1 language
    }

    if (filters.rating?.length) {
      params.vote_average_gte = filters.rating[0]; // Chỉ 1 rating
    }

    if (filters.sortBy?.length) {
      params.sort_by = filters.sortBy[0]; // Chỉ 1 sort
    }

    // Add page
    params.page = filters.page || 1;

    // Add URL params nếu không có trong filters
    if (filters.with_genres) {
      params.with_genres = filters.with_genres;
    }

    if (filters.with_origin_country) {
      params.with_origin_country = filters.with_origin_country;
    }

    return params;
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true); // Đảm bảo loading = true khi bắt đầu fetch

        const apiFilters = buildApiFilters();
        console.log("API Filters:", apiFilters);

        let data;

        if (shouldUseSearchAPI(apiFilters)) {
          // Dùng Search API
          const query = buildSearchQuery(apiFilters);
          console.log("Using Search API with query:", query);

          if (query) {
            data = await searchMovies(query);
          } else {
            // Fallback to discover nếu không có query
            const discoverParams = buildDiscoverParams(apiFilters);
            data = await getDiscoverMovies(discoverParams);
          }
        } else {
          // Dùng Discover API
          const discoverParams = buildDiscoverParams(apiFilters);
          console.log("Using Discover API with params:", discoverParams);
          data = await getDiscoverMovies(discoverParams);
        }

        setMovies(data.results || []);
        setCurrentPage(data.page || 1);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error("Failed to fetch movies", error);
        setMovies([]);
      } finally {
        setLoading(false); // ĐÂY LÀ CHỖ SỬA: setLoading(false) thay vì setLoading(true)
      }
    };

    fetchMovies();
  }, [urlGenreId, urlCountryCode, urlKeyword, currentPage, activeFilters]);

  // Effect riêng để handle onRenderComplete
  useEffect(() => {
    // Chỉ gọi onRenderComplete khi:
    // 1. Không còn loading
    // 2. Chưa gọi onRenderComplete trước đó (tránh gọi nhiều lần)
    // 3. Component đã mount xong
    if (!loading && !hasRendered && onRenderComplete) {
      console.log("MovieListing render complete, calling onRenderComplete");
      onRenderComplete();
      setHasRendered(true);
    }
  }, [loading, hasRendered, onRenderComplete]);

  // Reset hasRendered khi URL params thay đổi (để có thể gọi lại onRenderComplete cho route mới)
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
    <div className="listing-container" style={{ padding: "80px" }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-3 col-lg-4 col-md-5">
            <FilterSidebar onFilterChange={handleFilterChange} />
          </div>
          <div className="col-xl-9 col-lg-8 col-md-7">
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
