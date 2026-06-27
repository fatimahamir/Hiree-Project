import axios from 'axios';

const API = axios.create({
  baseURL: 'https://hiree-project-production.up.railway.app/', 
});

// Har request ke sath token bhejne ke liye
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;