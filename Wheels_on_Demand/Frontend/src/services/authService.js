import api from './axiosConfig';

export const register = async (userData) => {
  try {
    const response = await api.post('/Auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const login = async (userData) => {
  try {
    const response = await api.post('/Auth/login', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
