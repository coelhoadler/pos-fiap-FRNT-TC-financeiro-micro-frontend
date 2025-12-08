import { createContext, useContext, useEffect, useState } from 'react';
import {
  accountServices,
  transactionServices,
} from '../../../../../libs/api-client/src/index';
import { IaccountData } from '../../../../../libs/api-client/src/Models/accountModels';
import {
  ITransactionData,
  ITypeTransaction,
} from '../../../../../libs/api-client/src/Models/transactionModels';
import {
  TransactionContextType,
  TransactionProviderProps,
} from '../../types/TransactionContextType';

// TODO Verificar a possibilidade refatorar itens neste arquivo

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);
const transactionAPIMethods = new transactionServices<ITransactionData>();
const accountAPIMethods = new accountServices<IaccountData>();

export const TransactionProvider = ({ children }: TransactionProviderProps) => {
  const [id, setId] = useState('');
  const [valueEdit, setValueEdit] = useState('');
  const [extract, setExtract] = useState<any[]>([]);
  const [typeTransactionEdit, setTypeTransactionEdit] =
    useState<ITypeTransaction>({} as ITypeTransaction);
  const [balance, setBalance] = useState<number>(0);
  const user = JSON.parse(localStorage.getItem('user')) || {};

  // TODO: Verificar a possibilidade de remover
  // tratamento de erro por aqui
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const responseData: any =
          await transactionAPIMethods.getTransactionsAll();

        if (responseData?.message === 'Nenhuma transação encontrada.') {
          setExtract([]);
          handlerUpdateAccount([]);
          return;
        }

        setExtract(responseData || []);
        handlerUpdateAccount(responseData || []);
      } catch (error) {
        if (error?.status === 401) {
          window.location.href = '/login';
        }
        console.error('Erro ao buscar transações:', error);
      }
    };

    fetchTransaction();
  }, []);

  const calculateTotalAmount = (responseData: ITransactionData[]) => {
    return responseData.reduce((total, item) => {
      const amount = parseFloat(
        item.amount
          .replace('R$', '')
          .trim()
          .replace(/\./g, '')
          .replace(',', '.')
      );

      setBalance((total + amount) as number);

      return (total + amount) as number;
    }, 0);
  };

  const handlerUpdateAccount = async (responseData: ITransactionData[]) => {
    const account = {
      accountNumber: user.accountNumber,
      balance: calculateTotalAmount(responseData || []),
      currency: 'BRL',
      accountType: 'Conta Corrente',
    };
    await accountAPIMethods.updateAccountById(user.accountNumber, account);
  };

  return (
    <TransactionContext.Provider
      value={{
        id,
        setId,
        valueEdit,
        setValueEdit,
        extract,
        setExtract,
        typeTransactionEdit,
        setTypeTransactionEdit,
        balance,
        setBalance,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error('useTransaction must be used within a TransactionProvider');
  }
  return context;
};
