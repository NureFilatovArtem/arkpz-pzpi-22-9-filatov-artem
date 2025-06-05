import api from './api';

export const login = async (credentials) => {
  // POST /api/login (proxied)
  const response = await api.post('/api/login', credentials);
  const { token, ...user } = response.data;
  if (token) localStorage.setItem('jwtToken', token);
  return user;
};

export const logout = async () => {
  localStorage.removeItem('jwtToken');
};

// (Optional) Получить профиль пользователя
export const fetchUserProfile = async () => {
  const response = await api.get('/me'); // если есть такой endpoint
  return response.data;
}; 