import api from './http';
import axios from 'axios';

export const getAllTransactions = async () => {
  try {
      const response = await axios.get('http://localhost:3000/api/transactions');
      console.log('Response Data:', response.data); // Debugging line
    return response.data;
  } catch (error) {
    
    console.error('Error fetching transactions:', error);
  }

  

};
