import api from './http';

export const getAllTransactions = async () => {
  try {
    const response = await api.get('/api/transactions');
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
  }
};
