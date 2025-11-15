import api from './http';
import { Iaccount } from './Models/accountModels';
import { Itransaction } from './Models/transactionModels';

export class transactionServices<T> implements Itransaction {
  getTransactionsAll = async () => {
    try {
      const response = await api.get('/api/transactions');
      return response.data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  // createTransaction = async (id: string) => {
  //   return;
  // };
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
