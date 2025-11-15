export interface Itransaction {
  getTransactionsAll: () => Promise<[]>;
  // getTransactionById: (id: string) => Promise<{}>;
  // createTransaction: (data: Partial<{}>) => Promise<{}>;
  // updateTransactionById: (id: string, data: Partial<{}>) => Promise<{}>;
  // deleteTransactionById: (id: string) => Promise<void>;
}
