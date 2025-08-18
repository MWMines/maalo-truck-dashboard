import axios from "axios";

// Replace with your actual server IP
const SERVER_PREFIX = "http://165.22.221.105:80";

// Create axios instance
const api = axios.create({
  baseURL: SERVER_PREFIX,
});

// Add interceptor for userId and prefix
api.interceptors.request.use((config) => {
  // Get userId and jwt token from localStorage
  const userId = localStorage.getItem("userId");
  const jwt = localStorage.getItem("jwt");
  if (userId) {
    config.headers["userId"] = userId;
  }
  if (jwt) {
    config.headers["Authorization"] = `Bearer ${jwt}`;
  }
  // Ensure all requests use the server prefix
  return config;
});

export default api;
