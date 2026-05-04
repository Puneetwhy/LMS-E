import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5014",
  withCredentials: true,
});

export default axiosInstance;