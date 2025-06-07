import axios from "axios";

// Default config for axios
axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + process.env.REACT_APP_SECRET_KEY;
axios.defaults.headers.common["Content-Type"] = "application/json";

// Base URL and Image URL
export const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
export const BACKDROP_ORIGINAL_URL = "https://image.tmdb.org/t/p/original";
export const BACKDROP_W300_URL = "https://image.tmdb.org/t/p/w300";
export const BACKDROP_W780_URL = "https://image.tmdb.org/t/p/w780";
export const BACKDROP_W1280_URL = "https://image.tmdb.org/t/p/w1280";
// Get Animation and Action movies
export const getActionMovies = async () => {
  try {
    const response = await axios.get("/discover/movie", {
      params: {
        language: "en-US",
        with_genres: "28", // 28: Action
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching action movies:", error);
    throw error;
  }
};

// Get Movie Detail
export const getMovieDetail = async (movieId) => {
  try {
    const response = await axios.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie detail:", error);
    throw error;
  }
};

// Get Movie Trailer
export const getMovieTrailer = async (movieId) => {
  try {
    const response = await axios.get(`/movie/${movieId}/videos`);

    return response.data.results;
  } catch (error) {
    console.error("Error fetching movie trailer:", error);
    throw error;
  }
};

// Get Movie Trending
export const getMovieTrending = async () => {
  try {
    const response = await axios.get("/trending/movie/day?language=en-US");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movie trending:", error);
    throw error;
  }
};

// Get Recently Released Movies
export const getRecentlyReleasedMovies = async () => {
  try {
    const response = await axios.get("/discover/movie", {
      params: {
        language: "en-US",
        primary_release_date_lte: new Date().toISOString().split("T")[0],
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching recently released movies:", error);
    throw error;
  }
};

// Get Movies With Genres
export const getMoviesWithGenres = async (genreId = "28") => {
  try {
    const response = await axios.get("/discover/movie", {
      params: {
        language: "en-US",
        with_genres: genreId,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies with genres:", error);
    throw error;
  }
};

// Get Upcoming Movies
export const getUpcomingMovies = async () => {
  const today = new Date();
  const threeMonthsLater = new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000); // 3 month

  const formattedToday = today.toISOString().split("T")[0]; // YYYY-MM-DD
  const formattedMaxDate = threeMonthsLater.toISOString().split("T")[0];

  try {
    const response = await axios.get("/discover/movie", {
      params: {
        language: "en-US",
        region: "US",
        sort_by: "primary_release_date.desc", // sort theo ngày phát hành tăng dần
        include_adult: false,
        include_video: false,
        with_release_type: "2|3", // theatrical, premiere
        "primary_release_date.gte": formattedToday,
        "primary_release_date.lte": formattedMaxDate,
        page: 1,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};

// Get Movie Credits
export const getMovieCredits = async (movieId) => {
  try {
    const response = await axios.get(`/movie/${movieId}/credits`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    throw error;
  }
};

// Get All Genres
export const getAllGenres = async () => {
  try {
    const response = await axios.get("/genre/movie/list");
    return response.data;
  } catch (error) {
    console.error("Error fetching all genres:", error);
    throw error;
  }
};

// Discover Movies
export const getDiscoverMovies = async (filters = {}) => {
  try {
    console.log(filters);

    const response = await axios.get("/discover/movie", {
      params: {
        language: filters.language || "en-US", // select only 1 (data type string)
        page: filters.page || 1, // select only 1 (data type int32)
        sort_by: filters.sort_by || "popularity.desc", // select only 1 (data type string)
        vote_average_gte: filters.vote_average_gte, // select only 1 (data type float)
        with_genres: filters.with_genres, // select more than 1 (data type string)
        with_origin_country: filters.with_origin_country, // select only 1 (data type string)
        with_release_type: filters.with_release_type, // select more than 1 (data type int32)
        primary_release_year: filters.primary_release_year, // select only 1 (data type int32)
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching discover movies:", error);
    throw error;
  }
};

// Search by keyword
export const searchMovies = async (keyword) => {
  try {
    const response = await axios.get("/search/movie", {
      params: {
        query: keyword,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};
