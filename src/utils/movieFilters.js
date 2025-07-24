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

  // Merge URL params into filters (URL params have lower priority than activeFilters)
  if (urlGenreId && !apiFilters.genre?.length) {
    apiFilters.with_genres = urlGenreId;
  }

  if (urlCountryCode && !apiFilters.country?.length) {
    apiFilters.with_origin_country = urlCountryCode;
  }

  // Keyword from URL will override letter filter
  if (urlKeyword) {
    apiFilters.keyword = urlKeyword;
    // Remove letter if there is keyword from URL
    delete apiFilters.letter;
  }

  return apiFilters;
};

/**
 * Determine whether to use Search API or Discover API
 */
export const shouldUseSearchAPI = (filters) => {
  // Use Search API when:
  // 1. Has letter filter (alphabetic search)
  // 2. Has keyword from URL params
  return !!(filters.letter || filters.keyword);
};

/**
 * Build search query for Search API
 */
export const buildSearchQuery = (filters) => {
  if (filters.keyword) {
    return filters.keyword; // Keyword from URL
  }

  if (filters.letter) {
    // Convert letter to search query
    // Example: "A" -> search movies starting with "A"
    return filters.letter;
  }

  return "";
};

/**
 * Build parameters for Discover API
 */
export const buildDiscoverParams = (filters) => {
  const params = {};

  // Map converted filters to TMDB API params
  if (filters.genre?.length) {
    params.with_genres = filters.genre.join(","); // TMDB needs comma-separated
  }

  if (filters.country?.length) {
    params.with_origin_country = filters.country[0]; // Only 1 country
  }

  if (filters.year?.length) {
    params.primary_release_year = filters.year[0]; // Only 1 year
  }

  if (filters.type?.length) {
    params.with_release_type = filters.type.join(","); // TMDB needs comma-separated
  }

  if (filters.language?.length) {
    params.with_original_language = filters.language[0]; // Only 1 language
  }

  if (filters.rating?.length) {
    params.vote_average_gte = filters.rating[0]; // Only 1 rating
  }

  if (filters.sortBy?.length) {
    params.sort_by = filters.sortBy[0]; // Only 1 sort
  }

  // Add page
  params.page = filters.page || 1;

  // Add URL params if not in filters
  if (filters.with_genres) {
    params.with_genres = filters.with_genres;
  }

  if (filters.with_origin_country) {
    params.with_origin_country = filters.with_origin_country;
  }

  return params;
};
