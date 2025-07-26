import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const getUserProfile = () => axios.get(`${API_BASE_URL}/api/user/info`, {
  withCredentials: true,
});

const userLogout = () => axios.post(`${API_BASE_URL}/api/user/logout`, {}, {
  withCredentials: true,
}).then(() => {
  window.location.href = "/";
});

export { getUserProfile, userLogout };