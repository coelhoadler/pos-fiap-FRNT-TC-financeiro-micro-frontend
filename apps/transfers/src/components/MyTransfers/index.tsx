import { useEffect, useState } from 'react';
import { ITransaction } from '../../Models/transactionModels';
import { transactionServices } from '../../services/Transacoes/apiEndpoints';
import TransferItem from './TransferItem';
import { sortExtractByAscDate } from '../../utils/formatters';
import AlertDialog from '../Dialog';
import SuccessSnackbar from '../SucessSnackBar';
import { alertDialogTypes } from '../../enums/alertDialogTypes';
import { TAlertDialogType } from '../../types/TAlertDialogType';
import { useTransaction } from '../../setup/context/transactionContext';
import { accountServices } from '../../services/Account/apiEndpoint';
import { toast } from 'react-toastify';

type TAccountStatement = {
  onEditTransaction?: () => void;
};

const MyTransfers = ({ onEditTransaction }: TAccountStatement) => {
  const [myTransactions, setMyTransactions] = useState<ITransaction[]>([]);
  const { extract, transactionServices, setBalance } = useTransaction();
  const [dialogType, setDialogType] = useState<TAlertDialogType>({
    type: alertDialogTypes.DELETE,
  });
  const [id, setId] = useState<string>('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchTransaction = async () => {
      const responseData = await transactionServices.getAll();
      const extractOrdered = sortExtractByAscDate(responseData || []);
      setMyTransactions(extractOrdered);
    };

    fetchTransaction();
  }, []);

  const handleTransactionDeleteConfirmation = (transactionId: string) => {
    setShowConfirmDialog(true);
    setId(transactionId);
  };

  const calculateTotalAmount = (responseData: ITransaction[]) => {
    return responseData.reduce((total, item) => {
      const amount = parseFloat(
        item.amount.replace('R$', '').trim().replace('.', '').replace(',', '.')
      );
      return total + amount;
    }, 0);
  };

  const handlerUpdateAccount = async (responseData: ITransaction[]) => {
    const accountJoana = {
      accountNumber: '123456789',
      balance: calculateTotalAmount(responseData || []),
      currency: 'BRL',
      accountType: 'Conta Corrente',
    };
    setBalance(accountJoana.balance);
    await accountServices.updateAccountById('123456789', accountJoana);
  };

  const handleConfirmSubmit = async (transactionId: string) => {
    try {
      await transactionServices.delete(transactionId);

      if (myTransactions) {
        const remainingTransactions = myTransactions.filter(
          (transaction) => transaction.id !== transactionId
        );

        handlerUpdateAccount(remainingTransactions);
        setMyTransactions(remainingTransactions);
        toast.dismiss();
        setShowSuccess(true);
        setShowConfirmDialog(false);
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Minhas Transferências</h2>
      {myTransactions.length > 0 ? (
        myTransactions.map((transaction, index) => (
          <TransferItem
            key={index}
            item={transaction}
            onDelete={() =>
              handleTransactionDeleteConfirmation(transaction.id!)
            }
            onEdit={onEditTransaction}
          />
        ))
      ) : (
        <p>Nenhuma transação encontrada.</p>
      )}

      {
        <AlertDialog
          open={showConfirmDialog}
          type={dialogType.type}
          setOpen={setShowConfirmDialog}
          handleConfirmSubmit={() => handleConfirmSubmit(id)}
        />
      }

      {
        <SuccessSnackbar
          open={showSuccess}
          onClose={() => setShowSuccess(false)}
          message={'Transação excluída com sucesso!'}
          duration={3000}
        />
      }
    </div>
  );
};

export default MyTransfers;
