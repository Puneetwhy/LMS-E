import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://lms-e-backend-s3rw.onrender.com",
  withCredentials: true, // ✅ Send cookies cross-origin
});

// ================= REQUEST INTERCEPTOR =================
// Attaches Bearer token from localStorage as fallback for cross-origin cookie issues
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ================= RESPONSE INTERCEPTOR =================
// Handles token expiry globally — redirects to login on 401
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear stored token if it's expired/invalid
      localStorage.removeItem("token");

      // Redirect to login page
      // Adjust the path to match your React Router login route
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
