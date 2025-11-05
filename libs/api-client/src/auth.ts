import api from './http';

export const authenticateUser = async (email: string, password: string) => {
  try {
    const response = await api.post('/api/user/auth', { email, password });    
    console.log('Authentication Response Data:', response.data); // Debugging line  
    return response.data;
  } catch (error) {
    console.error('Error during authentication:', error);
    throw error;
  }
};
