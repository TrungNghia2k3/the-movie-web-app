// utils/movieFilters.js

/**
 * Build API filters by merging URL params with active filters
 */
export const buildApiFilters = (
  activeFilters,
  currentPage,
  urlGenreId,
  urlCountryCode,
  urlKeyword
) => {
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

/**
 * Determine whether to use Search API or Discover API
 */
export const shouldUseSearchAPI = (filters) => {
  // Dùng Search API khi:
  // 1. Có letter filter (alphabetic search)
  // 2. Có keyword từ URL params
  return !!(filters.letter || filters.keyword);
};

/**
 * Build search query for Search API
 */
export const buildSearchQuery = (filters) => {
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

/**
 * Build parameters for Discover API
 */
export const buildDiscoverParams = (filters) => {
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
