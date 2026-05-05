// axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://lms-e-backend-s3rw.onrender.com",
  withCredentials: true,
});

// Attach token from localStorage as fallback
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // or wherever you store it
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
