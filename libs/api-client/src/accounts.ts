import api from './http';
import { IaccountData, IaccountMethods } from './Models/accountModels';

export class accountServices<T> implements IaccountMethods {
  updateAccountById = async (
    accountNumber: string,
    data: Partial<IaccountData>
  ) => {
    try {
      const response = await api.put(`/api/accounts/${accountNumber}`, data);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar transação:', error);
    }
  };
}
