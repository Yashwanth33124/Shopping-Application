/**
 * Centralized API Configuration
 * Use this file to manage backend URLs for different environments
 */

const API_CONFIG = {
  // Base URL for all API calls
  // Use import.meta.env for Vite (NOT process.env which is Node.js only)
  BASE_URL: import.meta.env.VITE_API_URL || "https://shopping-application-zlff.onrender.com/api",
  
  // Alternative (if environment variable is not set)
  FALLBACK_URL: "https://shopping-application-zlff.onrender.com/api",
};

// For development, you can override:
// const API_CONFIG = {
//   BASE_URL: "http://localhost:3001/api"
// };

export const getApiUrl = (endpoint = "") => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

export default API_CONFIG;
