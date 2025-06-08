// utils/imageHelpers.js

// Constants
const BACKDROP_W780_URL = "https://image.tmdb.org/t/p/w780";
const POSTER_W500_URL = "https://image.tmdb.org/t/p/w500";

// Default fallback gradient
const DEFAULT_GRADIENT =
  "linear-gradient(to right, rgba(227, 227, 227, 1) calc((50vw - 170px) - 340px), rgba(227, 227, 227, 0.84) 50%, rgba(227, 227, 227, 0.84) 100%)";

/**
 * Get image style for backdrop with fallback gradient
 * @param {string|null} backdropPath - The backdrop path from API
 * @param {string} baseUrl - Base URL for images (default: BACKDROP_W780_URL)
 * @returns {string|object} - URL string or style object with gradient
 */
export const getBackdropImageStyle = (
  backdropPath,
  baseUrl = BACKDROP_W780_URL
) => {
  if (backdropPath) {
    return baseUrl + backdropPath;
  }
  return {
    backgroundImage: DEFAULT_GRADIENT,
  };
};

/**
 * Get image style for poster with fallback gradient
 * @param {string|null} posterPath - The poster path from API
 * @param {string} baseUrl - Base URL for images (default: POSTER_W500_URL)
 * @returns {string|object} - URL string or style object with gradient
 */
export const getPosterImageStyle = (posterPath, baseUrl = POSTER_W500_URL) => {
  if (posterPath) {
    return baseUrl + posterPath;
  }
  return {
    backgroundImage: DEFAULT_GRADIENT,
  };
};

/**
 * Get complete background style object (ready to use in style prop)
 * @param {string|null} imagePath - The image path from API
 * @param {string} baseUrl - Base URL for images
 * @returns {object} - Complete style object with backgroundImage
 */
export const getBackgroundStyle = (imagePath, baseUrl = BACKDROP_W780_URL) => {
  if (imagePath) {
    return {
      backgroundImage: `url(${baseUrl + imagePath})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    };
  }
  return {
    backgroundImage: DEFAULT_GRADIENT,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
};

/**
 * Get image URL with fallback to placeholder
 * @param {string|null} imagePath - The image path from API
 * @param {string} baseUrl - Base URL for images
 * @param {string} fallbackUrl - Fallback image URL
 * @returns {string} - Complete image URL
 */
export const getImageUrl = (
  imagePath,
  baseUrl = BACKDROP_W780_URL,
  fallbackUrl = "/placeholder.jpg"
) => {
  return imagePath ? baseUrl + imagePath : fallbackUrl;
};

/**
 * Custom gradient generator
 * @param {string} direction - Gradient direction (default: 'to right')
 * @param {Array} colors - Array of color stops
 * @returns {object} - Style object with custom gradient
 */
export const createCustomGradient = (
  direction = "to right",
  colors = [
    "rgba(227, 227, 227, 1) calc((50vw - 170px) - 340px)",
    "rgba(227, 227, 227, 0.84) 50%",
    "rgba(227, 227, 227, 0.84) 100%",
  ]
) => {
  return {
    backgroundImage: `linear-gradient(${direction}, ${colors.join(", ")})`,
  };
};

// Export constants for use in other files
export { BACKDROP_W780_URL, POSTER_W500_URL, DEFAULT_GRADIENT };
