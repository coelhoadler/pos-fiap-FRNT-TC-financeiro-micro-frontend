import { ITransaction } from '../../models/transactionModels';
import { ApiServices } from '../apiServices';

export const transactionServices = new ApiServices<ITransaction>(
  '/api/transactions'
);
