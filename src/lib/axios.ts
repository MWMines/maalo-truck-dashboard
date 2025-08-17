import axios from "axios";

// Replace with your actual server IP
const SERVER_PREFIX = "http://localhost:8080";

// Create axios instance
const api = axios.create({
  baseURL: SERVER_PREFIX,
});

// Add interceptor for userId and prefix
api.interceptors.request.use((config) => {
  // Get userId from localStorage or your auth context
  const userId = localStorage.getItem("userId");
  if (userId) {
    config.headers["userId"] = userId;
  }
  // Ensure all requests use the server prefix
  if (config.url && !config.url.startsWith(SERVER_PREFIX)) {
    config.url = SERVER_PREFIX + config.url;
  }
  return config;
});

export default api;
