// filterConverter.js
// Helper functions để convert filter values từ display names sang API values

/**
 * Convert filters từ UI format sang API format
 * @param {Object} filters - Filter object từ UI state
 * @param {Object} lookupData - Data objects chứa các mapping
 * @returns {Object} - Converted filters cho API
 */
export const convertFiltersForAPI = (
  filters,
  { genres, countries, types, languages, sorts }
) => {
  const convertedFilters = {};

  // Convert genre names to IDs (int32[]) - TMDB field: with_genres
  if (filters.genre && filters.genre.length > 0) {
    convertedFilters.genre = filters.genre
      .map((genreName) => {
        const genre = genres.find((g) => g.name === genreName);
        return genre ? genre.id : null;
      })
      .filter((id) => id !== null);
  }

  // Convert country names to ISO codes (string[]) - TMDB field: with_origin_country
  if (filters.country && filters.country.length > 0) {
    convertedFilters.country = filters.country
      .map((countryName) => {
        const country = countries.find((c) => c.english_name === countryName);
        return country ? country.iso_3166_1 : null;
      })
      .filter((iso) => iso !== null);
  }

  // Convert year strings to integers (int32[]) - TMDB field: primary_release_year
  if (filters.year && filters.year.length > 0) {
    convertedFilters.year = filters.year.map((year) => parseInt(year, 10));
  }

  // Convert type names to IDs (int32[]) - TMDB field: with_release_type
  if (filters.type && filters.type.length > 0) {
    convertedFilters.type = filters.type
      .map((typeName) => {
        const type = types.find((t) => t.name === typeName);
        return type ? type.id : null;
      })
      .filter((id) => id !== null);
  }

  // Convert language names to ISO codes (string[]) - TMDB field: with_original_language
  if (filters.language && filters.language.length > 0) {
    convertedFilters.language = filters.language
      .map((languageName) => {
        const language = languages.find((l) => l.english_name === languageName);
        return language ? language.iso_639_1 : null;
      })
      .filter((iso) => iso !== null);
  }

  // Convert rating strings to floats (float[]) - TMDB field: vote_average_gte
  if (filters.rating && filters.rating.length > 0) {
    convertedFilters.rating = filters.rating.map((rating) =>
      parseFloat(rating)
    );
  }

  // Convert sort names to IDs (string[]) - TMDB field: sort_by
  if (filters.sortBy && filters.sortBy.length > 0) {
    convertedFilters.sortBy = filters.sortBy
      .map((sortName) => {
        const sort = sorts.find((s) => s.name === sortName);
        return sort ? sort.id : null;
      })
      .filter((id) => id !== null);
  }

  // Add letter filter if exists - For Search API
  if (filters.letter && filters.letter !== "All") {
    convertedFilters.letter = filters.letter;
  }

  return convertedFilters;
};

/**
 * Create lookup maps for better performance (optional optimization)
 * @param {Object} data - Data objects
 * @returns {Object} - Lookup maps
 */
export const createLookupMaps = ({
  genres,
  countries,
  types,
  languages,
  sorts,
}) => {
  return {
    genreNameToId: new Map(genres.map((g) => [g.name, g.id])),
    countryNameToIso: new Map(
      countries.map((c) => [c.english_name, c.iso_3166_1])
    ),
    typeNameToId: new Map(types.map((t) => [t.name, t.id])),
    languageNameToIso: new Map(
      languages.map((l) => [l.english_name, l.iso_639_1])
    ),
    sortNameToId: new Map(sorts.map((s) => [s.name, s.id])),
  };
};

/**
 * Optimized converter using lookup maps
 * @param {Object} filters - Filter object từ UI state
 * @param {Object} lookupMaps - Pre-created lookup maps
 * @returns {Object} - Converted filters cho API
 */
export const convertFiltersForAPIOptimized = (filters, lookupMaps) => {
  const {
    genreNameToId,
    countryNameToIso,
    typeNameToId,
    languageNameToIso,
    sortNameToId,
  } = lookupMaps;

  const convertedFilters = {};

  if (filters.genre?.length > 0) {
    convertedFilters.genre = filters.genre
      .map((name) => genreNameToId.get(name))
      .filter((id) => id !== undefined);
  }

  if (filters.country?.length > 0) {
    convertedFilters.country = filters.country
      .map((name) => countryNameToIso.get(name))
      .filter((iso) => iso !== undefined);
  }

  if (filters.year?.length > 0) {
    convertedFilters.year = filters.year.map((year) => parseInt(year, 10));
  }

  if (filters.type?.length > 0) {
    convertedFilters.type = filters.type
      .map((name) => typeNameToId.get(name))
      .filter((id) => id !== undefined);
  }

  if (filters.language?.length > 0) {
    convertedFilters.language = filters.language
      .map((name) => languageNameToIso.get(name))
      .filter((iso) => iso !== undefined);
  }

  if (filters.rating?.length > 0) {
    convertedFilters.rating = filters.rating.map((rating) =>
      parseFloat(rating)
    );
  }

  if (filters.sortBy?.length > 0) {
    convertedFilters.sortBy = filters.sortBy
      .map((name) => sortNameToId.get(name))
      .filter((id) => id !== undefined);
  }

  if (filters.letter && filters.letter !== "All") {
    convertedFilters.letter = filters.letter;
  }

  return convertedFilters;
};
