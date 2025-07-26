import { ITransaction } from '../../Models/transactionModels';
import { ApiServices } from '../apiServices';

export const transactionServices = new ApiServices<ITransaction>(
  '/api/transactions'
);
