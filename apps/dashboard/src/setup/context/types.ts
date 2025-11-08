import { ReactNode } from 'react';
import { ITransaction, ITypeTransaction } from '../../Models/transactionModels';
import { ApiServices } from '../../services/apiServices';

export type TransactionContextType = {
  id: string;
  setId: (id: string) => void;
  valueEdit: string;
  setValueEdit: (value: string) => void;
  extract: any[];
  setExtract: (extract: any[]) => void;
  transactionServices: ApiServices<ITransaction>;
  typeTransactionEdit: ITypeTransaction;
  setTypeTransactionEdit: (typeTransaction: ITypeTransaction) => void;
  balance: number;
  setBalance: (balance: number) => void;
};

export type TransactionProviderProps = {
  children: ReactNode;
};
