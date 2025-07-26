import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const getUserProfile = axios.post(`${API_BASE_URL}/api/user/auth`, {
  email: 'adm@teste.com.br',
  password: '123mudar',
});

export const getUserInfo = axios.get(`${API_BASE_URL}/api/user/info`, {
  withCredentials: true,
});
