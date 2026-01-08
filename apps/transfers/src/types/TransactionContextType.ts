import { ReactNode } from 'react';
import { ITypeTransaction } from '../../../../libs/api-client/src/Models/transactionModels';

export type TransactionContextType = {
  id: string;
  setId: (id: string) => void;
  valueEdit: string;
  setValueEdit: (value: string) => void;
  extract: any[];
  setExtract: (extract: any[]) => void;
  typeTransactionEdit: ITypeTransaction;
  setTypeTransactionEdit: (typeTransaction: ITypeTransaction) => void;
  balance: number;
  setBalance: (balance: number) => void;
};

export type TransactionProviderProps = {
  children: ReactNode;
};
