import api from './http';
import { ITransactionData, ITransactionMethods} from './Models/transactionModels';

export class transactionServices<T> implements ITransactionMethods {
  getTransactionsAll = async () => {
    try {
      const response = await api.get('/api/transactions');
      return response.data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  createTransaction = async (data: ITransactionData) => {
    try {
      const response = await api.post('/api/transactions', data);
      return response.data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  // getTransactionById = async (id: string) => {
  //   return;
  // };
  // updateTransactionById = async (id: string) => {
  //   return;
  // };
  // deleteTransactionById = async (id: string) => {
  //   return;
  // };
}
