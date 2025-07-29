import { useEffect, useState } from 'react';
import { ITransaction } from '../../Models/transactionModels';
import { transactionServices } from '../../services/Transacoes/apiEndpoints';
import TransferItem from './TransferItem';
import { sortExtractByAscDate } from '../../utils/formatters';

const MyTransfers = () => {

  const [myTransactions, setMyTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    const fetchTransaction = async () => {
      const responseData = await transactionServices.getAll();
      const extractOrdered = sortExtractByAscDate(responseData || []);
      setMyTransactions(extractOrdered);
    };
    
    fetchTransaction();
  }, []);

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Minhas Transferências</h2>
      {myTransactions.length > 0 ? (
        myTransactions.map((transaction, index) => (
          <TransferItem key={index} item={transaction} onDelete={() => { }} />
        ))
      ) : (
        <p>Nenhuma transação encontrada.</p>
      )}
    </div>
  );
}

export default MyTransfers;