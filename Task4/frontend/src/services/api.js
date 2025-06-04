import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api', // Подстрой под свой backend
  withCredentials: false, // true если нужен cookie
});

// Добавляем токен в каждый запрос, если он есть
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

// Глобальная обработка ошибок (например, 401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Можно сделать logout или редирект
      // window.location = '/login';
    }
    return Promise.reject(error);
  }
);

export default api; 