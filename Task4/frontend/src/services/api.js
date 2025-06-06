import axios from 'axios';

const api = axios.create({
  baseURL: '/', // Use relative paths for proxy to work
  withCredentials: false, // JWT is sent in header, not cookies
});

// Attach JWT token to every request if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Global error handler (e.g., for 401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Optionally, handle logout or redirect here
      // window.location = '/login';
      // Or clear token: localStorage.removeItem('jwtToken');
    }
    return Promise.reject(error);
  }
);

export default api; 