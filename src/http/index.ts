import axios from 'axios';
import AuthService from '../services/authService';

// export const API_URL = 'https://localhost:44335/api';

export const API_URL = 'http://localhost:5206/api';

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/')
    ) {
      originalRequest._retry = true;
      const response = await AuthService.refresh();
      localStorage.setItem('token', response.data.accessToken);
      return api.request(originalRequest);
    }
    throw error;
  }
);

export default api;
