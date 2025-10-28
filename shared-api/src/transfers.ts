import api from './http';

export const getTransfers = async () => {
  const response = await api.get('/transfers');
  return response.data;
};
