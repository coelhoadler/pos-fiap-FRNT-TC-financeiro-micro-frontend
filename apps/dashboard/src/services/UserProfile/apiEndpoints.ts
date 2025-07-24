import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const getUserProfile = () => {
  try {
    const response = axios.post(`${API_BASE_URL}/api/user/auth`, {
      email: 'adm@teste.com.br',
      password: '123mudar',
    });
    return response;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};
