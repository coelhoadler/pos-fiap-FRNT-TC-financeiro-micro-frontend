import { ITypeTransaction } from '../../Models/transactionModels';
import { ApiServices } from './apiEndpoints';

export const typeTransactionService = new ApiServices<ITypeTransaction>(
  '/typeTransaction'
);
