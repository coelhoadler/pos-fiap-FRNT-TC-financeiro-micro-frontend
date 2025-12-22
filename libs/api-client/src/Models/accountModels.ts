export interface IaccountMethods {
  updateAccountById: (accountNumber: string, data: Partial<{}>) => Promise<{}>;
}

export interface IaccountData {
  accountNumber: string;
  balance: number;
  currency: string;
  accountType: string;
}