import api from './http';

export const userAuthentication = async (email: string, password: string) => {
  try {
    const response = await api.post('/api/user/auth', { email, password });
    console.log('Authentication Response Data:', response.data); // Debugging line
    console.log('Login Service Response:', response); // Debugging line
    return response.data;
  } catch (error) {
    console.error('Error during authentication:', error);
    throw error;
  }
};

export const userLogout = async () => {
  try {
    const response = await api.post('/api/user/logout');
    return response.data;
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};

export const userRegister = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await api.post('/api/user/create', {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

export const userInfo = async () => {
  try {
    const response = await api.get('/api/user/info');
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};
