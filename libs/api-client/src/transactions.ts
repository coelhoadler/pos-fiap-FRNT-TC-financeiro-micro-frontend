import api from './http';

export const getAllTransactions = async () => {
  try {
      const response = await api.get('/api/transactions');
      console.log('Response Data:', response.data); // Debugging line
    return response.data;
  } catch (error) {
    
    console.error('Error fetching transactions:', error);
  }
};