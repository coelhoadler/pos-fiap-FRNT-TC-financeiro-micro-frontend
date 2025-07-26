import { useEffect } from 'react';
import { IAccount } from '../../Models/accountModels';
import { accountServices } from '../../services/Account/apiEndpoint';
import AccountStatement from '../AccountStatement';
import CardBalance from '../CardBalance';
import FormTransaction from '../TransactionContainer';

export default function Home({ username }: { username: string }) {
  let accountStart: Partial<IAccount>;

  useEffect(() => {
    const fetchAccountStart = async () => {
      try {
        accountStart = await accountServices.getAccountById('123456789'); // Joana accountNumber is 123456789;
      } catch (error) {
        accountStart = { balance: 0 };
      }
    };
    fetchAccountStart();
  }, []);

  return (
    <div className="flex w-full h-full gap-3 mx-auto max-lg:flex-col">
      <div className="flex flex-col bg-white rounded-[8px] shadow-md p-5 w-full gap-4">
        <CardBalance balance={accountStart?.balance || 0} username={username} />
        <FormTransaction />
      </div>
      <div className="min-w-[350px]">
        <AccountStatement />
      </div>
    </div>
  );
}
