import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://lms-e-backend-s3rw.onrender.com/api/v1",
  withCredentials: true,
});

export default axiosInstance;
