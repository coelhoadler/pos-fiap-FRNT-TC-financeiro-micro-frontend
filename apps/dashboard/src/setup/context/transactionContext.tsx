import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { ITransaction, ITypeTransaction } from '../../Models/transactionModels';
import { accountServices } from '../../services/Account/apiEndpoint';
import { ApiServices } from '../../services/apiServices';
import { transactionServices } from '../../services/Transacoes/apiEndpoints';

type TransactionContextType = {
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

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

type TransactionProviderProps = {
  children: ReactNode;
};

export const TransactionProvider = ({ children }: TransactionProviderProps) => {
  const [id, setId] = useState('');
  const [valueEdit, setValueEdit] = useState('');
  const [extract, setExtract] = useState<any[]>([]);
  const [typeTransactionEdit, setTypeTransactionEdit] =
    useState<ITypeTransaction>({} as ITypeTransaction);
  const [balance, setBalance] = useState<number>(0);
  const user = JSON.parse(localStorage.getItem('user')) || {};

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const responseData: any = await transactionServices.getAll() 
        if (responseData?.message === "Nenhuma transação encontrada.") {
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

  const calculateTotalAmount = (responseData: ITransaction[]) => {
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

  const handlerUpdateAccount = async (responseData: ITransaction[]) => {
    const account = {
      accountNumber: user.accountNumber,
      balance: calculateTotalAmount(responseData || []),
      currency: 'BRL',
      accountType: 'Conta Corrente',
    };    
    await accountServices.updateAccountById(user.accountNumber, account);
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
        transactionServices: transactionServices,
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
