import api from './http';

export const getAllTransactions = async () => {
  const response = await api.get('api/transactions');
  console.log('Response Data:', response.data); // Debugging line
  return response.data;
};
