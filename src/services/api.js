import axios from 'axios';

const api = axios.create({
  baseURL: 'https://thevirustracker.com/',
});

export default api;
