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
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Tooltip from '@mui/material/Tooltip';

type TAccountStatement = {
  onEditTransaction?: () => void;
};

export default function AccountStatement({
  onEditTransaction,
}: TAccountStatement) {
  const [updatedTransactions, setUpdatedTransactions] = useState<
    ITransaction[]
  >([]);
  const { extract, transactionServices, setBalance, setExtract } = useTransaction();
  const [dialogType, setDialogType] = useState<TAlertDialogType>({
    type: alertDialogTypes.DELETE,
  });
  const [id, setId] = useState<string>('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Número de itens por página
  const user = JSON.parse(localStorage.getItem('user') || '{}');

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
        setExtract(remainingTransactions); // <-- Atualiza o contexto global

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
      accountNumber: user.accountNumber,
      balance: calculateTotalAmount(responseData || []),
      currency: 'BRL',
      accountType: 'Conta Corrente',
    };
    setBalance(accountJoana.balance);
    await accountServices.updateAccountById(user.accountNumber , accountJoana);
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
        setExtract(remainingTransactions); // <-- Atualiza o contexto global
        toast.dismiss();
        setShowSuccess(true);
        setShowConfirmDialog(false);
      }
    } catch (error) {
     if (error.status === 401) {
        toast.error('Sessão expirada, por favor faça login novamente.');
        window.location.href = '/login';
      }
      console.error('Erro ao enviar o formulário:', error);
    }
  };

  return (
    <div className="bg-gray-100 p-8 rounded-xl w-full max-w-full h-full shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[24px] font-bold">Extrato</h2>
      </div>

      <ul className="flex flex-col gap-5 text-left pt-5">
        {updatedTransactions.length > 0 ? (
          <>
            {updatedTransactions
              .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
              .map((transaction, index) => (
                <TransactionItem
                  item={transaction}
                  key={index}
                  onDelete={() => handleTransactionDeleteConfirmation(transaction.id!)}
                  onEdit={onEditTransaction}
                />
              ))}
            <div className="flex justify-center mt-4 gap-2 items-center">
              {currentPage > 0 && (
                <Tooltip title="Página anterior">
                  <button
                    className="bg-primary rounded-full h-[40px] w-[40px] flex items-center justify-center cursor-pointer"
                    disabled={currentPage === 0}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                  >
                    <ChevronLeftIcon style={{ color: 'white' }} />
                  </button>
                </Tooltip>
              )}
              {((currentPage + 1) * itemsPerPage < updatedTransactions.length) && (
                <Tooltip title="Próxima página">
                  <button
                    className="bg-primary rounded-full h-[40px] w-[40px] flex items-center justify-center cursor-pointer"
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    <ChevronRightIcon style={{ color: 'white' }}/>
                  </button>
                </Tooltip>
              )}
            </div>
          </>
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
