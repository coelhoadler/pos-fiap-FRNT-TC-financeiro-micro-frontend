
import api from './http';
import { ITransactionData, ITransactionMethods} from './Models/transactionModels';

export class transactionServices<T> implements ITransactionMethods {
  getTransactionsAll = async () => {
    try {
      const response = await api.get('/api/transactions');
      return response.data;
    } catch (error) {
      console.error('Erro ao listar transações:', error);
    }
  };

  createTransaction = async (data: ITransactionData) => {
    try {
      const response = await api.post('/api/transactions', data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar transação:', error);
    }
  };

  getTransactionById = async (id: string) => {
    try {
      const response = await api.get(`/api/transactions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar transação por id:', error);
    }
  };

  updateTransaction = async (id: string, data: ITransactionData) => {
    try {
      const response = await api.put(`/api/transactions/${id}`,data);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar transação:', error);
    }
  };

  deleteTransactionById = async (id: string) => {
    try {
      await api.delete(`/api/transactions/${id}`);
    } catch (error) {
      console.error('Erro ao deletar transação por id:', error);
    }
  };
}