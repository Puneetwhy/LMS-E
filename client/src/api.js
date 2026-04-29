import axios from 'axios';

const api = axios.create({
  baseURL: "lms-e-sdzj.vercel.app"

});

export default api;
