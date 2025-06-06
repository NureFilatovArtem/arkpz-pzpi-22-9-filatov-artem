import api from './api';

// credentials: { email, password }
export const login = async (credentials) => {
  try {
    // POST /api/login (proxied)
    const response = await api.post('/api/login', credentials);
    // Expecting: { token, user }
    const { token, user } = response.data;
    if (token) {
      localStorage.setItem('jwtToken', token);
    }
    return user; // or return response.data if you want both
  } catch (error) {
    // Log for debugging
    console.error("Login API error:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('jwtToken');
};

// (Optional) Получить профиль пользователя
export const fetchUserProfile = async () => {
  const response = await api.get('/me'); // если есть такой endpoint
  return response.data;
}; 