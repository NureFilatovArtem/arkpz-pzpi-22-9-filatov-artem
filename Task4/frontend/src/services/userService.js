import api from './api';

export const fetchUsers = async () => {
  const response = await api.get('/api/users/');
  return response.data.data || response.data; // адаптируй под свой backend
};

export const createUser = async (userData) => {
  const response = await api.post('/api/users/', userData);
  return response.data;
};

export const updateUser = async (userId, userData) => {
  const response = await api.put(`/api/users/${userId}`, userData);
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await api.delete(`/api/users/${userId}`);
  return response.data;
}; 