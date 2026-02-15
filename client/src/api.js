import axios from 'axios';

const api = axios.create({
  baseURL: 'https://lms-e.onrender.com' 
});

export default api;
