import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://lms-e-backend-s3rw.onrender.com",
  withCredentials: true,
});

export default axiosInstance;
