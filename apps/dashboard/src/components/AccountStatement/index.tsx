import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ITransaction } from '../../Models/transactionModels';
import { alertDialogTypes } from '../../enums/alertDialogTypes';
import { accountServices } from '../../services/Account/apiEndpoint';
import { useTransaction } from '../../setup/context/transactionContext';
import { TAlertDialogType } from '../../types/TAlertDialogType';
import { sortExtractByAscDate } from '../../utils/formatters';
import AlertDialog from '../Dialog';
import SuccessSnackbar from '../SuccessSnackbar';
import TransactionItem from '../TransactionItem';

type TAccountStatement = {
  onEditTransaction?: () => void;
};

export default function AccountStatement({
  onEditTransaction,
}: TAccountStatement) {
  const [updatedTransactions, setUpdatedTransactions] = useState<
    ITransaction[]
  >([]);
  const { extract, transactionServices, setBalance } = useTransaction();
  const [dialogType, setDialogType] = useState<TAlertDialogType>({
    type: alertDialogTypes.DELETE,
  });
  const [id, setId] = useState<string>('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [idTemp, setIdTemp] = useState('');

  useEffect(() => {
    const extractOrdered = sortExtractByAscDate(extract || []);
    setUpdatedTransactions(extractOrdered || []);
  }, [extract]);

  const handleTransactionDelete = async (transactionId: string) => {
    try {
      await transactionServices.delete(transactionId);

      if (updatedTransactions) {
        const remainingTransactions = updatedTransactions.filter(
          (transaction) => transaction.id !== transactionId
        );

        handlerUpdateAccount(remainingTransactions);
        setUpdatedTransactions(remainingTransactions);

        toast.success('Transação excluída com sucesso!');
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

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

      if (updatedTransactions) {
        const remainingTransactions = updatedTransactions.filter(
          (transaction) => transaction.id !== transactionId
        );

        handlerUpdateAccount(remainingTransactions);
        setUpdatedTransactions(remainingTransactions);
        toast.dismiss();
        setShowSuccess(true);
        setShowConfirmDialog(false);
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <div className="bg-gray-100 p-8 rounded-xl w-full max-w-full h-full shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[24px] font-bold">Extrato</h2>
      </div>

      <ul className="flex flex-col gap-5 text-left pt-5">
        {updatedTransactions.length > 0 ? (
          updatedTransactions.map((transaction, index) => (
            <>
              <TransactionItem
                item={transaction}
                key={index}
                onDelete={() =>
                  handleTransactionDeleteConfirmation(transaction.id!)
                }
                onEdit={onEditTransaction}
              />
            </>
          ))
        ) : (
          <span className="text-gray-500 text-center">
            Nenhuma transação encontrada.
          </span>
        )}
      </ul>
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
}
