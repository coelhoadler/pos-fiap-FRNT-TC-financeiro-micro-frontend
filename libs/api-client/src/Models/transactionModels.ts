export interface ITransactionMethods {
  getTransactionsAll: () => Promise<[]>;
  getTransactionById: (id: string) => Promise<{}>;
  createTransaction: (data: Partial<{}>) => Promise<{}>;
  updateTransaction: (id: string, data: Partial<{}>) => Promise<{}>;
  deleteTransactionById: (id: string) => Promise<void>;
}

export interface ITransactionData {
  id?: string;
  typeTransaction: ITypeTransaction;
  amount: string;
  date: string;
  accountNumber: string;
  base64Image?: string;
  fileMimetype?: string;
}

export interface ITypeTransaction {
  id: string;
  description: string;
}