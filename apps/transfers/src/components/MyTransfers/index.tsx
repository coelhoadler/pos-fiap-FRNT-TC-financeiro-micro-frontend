import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { alertDialogTypes } from '../../enums/alertDialogTypes';
import { ITransaction } from '../../Models/transactionModels';
import { accountServices } from '../../services/Account/apiEndpoint';
import { useTransaction } from '../../setup/context/transactionContext';
import { TAlertDialogType } from '../../types/TAlertDialogType';
import { sortExtractByAscDate } from '../../utils/formatters';
import AlertDialog from '../Dialog';
import SuccessSnackbar from '../SucessSnackBar';
import { TransfersFilters } from './TransferFilter';
import TransferItem from './TransferItem';
import { buildTransactionEditForm } from './utils';

const MyTransfers = () => {
  const [myTransactions, setMyTransactions] = useState<ITransaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    ITransaction[]
  >([]);
  const [filterError, setFilterError] = useState('');
  const [filters, setFilters] = useState({
    typeTransaction: '',
    minimumValue: '',
    maximumValue: '',
    startDate: '',
    endDate: '',
  });

  const { transactionServices, setBalance, extract, setExtract } = useTransaction();
  const [dialogType, setDialogType] = useState<TAlertDialogType>();
  const [id, setId] = useState<string>('');
  const [edit, setEdit] = useState<ITransaction>({} as ITransaction);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const user = JSON.parse(localStorage.getItem('user')) || '';

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const responseData = await transactionServices.getAll();
        const extractOrdered = sortExtractByAscDate(responseData || []);
        setMyTransactions(extractOrdered);  
      } catch (error) {
        if (error.status === 401) {
          window.location.href = '/login';
          console.error('Erro ao enviar o formulário:', error);
        }      
      }      
    };
    fetchTransaction();
  }, [extract]);

  const handleTransactionDeleteConfirmation = (transactionId: string) => {
    setDialogType({ type: alertDialogTypes.DELETE });
    setShowConfirmDialog(true);
    setId(transactionId);
  };

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

  const handleConfirmSubmit = async (transactionId: string) => {
    try {
      await transactionServices.delete(transactionId);
      const remainingTransactions = myTransactions.filter(
        (t) => t.id !== transactionId
      );
      handlerUpdateAccount(remainingTransactions);
      setMyTransactions(remainingTransactions);
      setShowSuccess(true);
      setShowConfirmDialog(false);
      toast.dismiss();
    } catch (error) {
        if (error?.status === 401) {
          window.location.href = '/login';
          console.error('Erro ao enviar o formulário:', error);
        } 
    }
  };

  const handleConfirmEditSubmit = async (transactionItem: ITransaction) => {
    const postTransaction = {
      ...transactionItem,
      date: new Date().toISOString(),
    };

    try {
      const updatedTransaction = await transactionServices.update(
        postTransaction.id!,
        postTransaction
      );

      setMyTransactions(
        myTransactions.map((item) =>
          item.id === updatedTransaction.id ? updatedTransaction : item
        )
      );

      handlerUpdateAccount(myTransactions);

      setShowSuccess(true);
      setShowConfirmDialog(false);
      toast.dismiss();
      setExtract([])

    } catch (error) {
        if (error.status === 401) {
          window.location.href = '/login';
          console.error('Erro ao enviar o formulário:', error);
        } 
    }
  };

  const handleEditTransaction = (transactionItem: ITransaction) => {
    localStorage.setItem('transactionItem', JSON.stringify(transactionItem));

    setDialogType({ type: alertDialogTypes.EDIT });
    setShowConfirmDialog(true);
    setEdit(transactionItem);
  };

  const handleCancelEdit = () => {
    const backupData = JSON.parse(localStorage.getItem('transactionItem'));

    setShowConfirmDialog(false);

    setMyTransactions(
      myTransactions.map((item) =>
        item.id === backupData.id ? backupData : item
      )
    );
  };

  const handleCancelSubmit = () => {
    setShowConfirmDialog
  }

  const normalizeStartDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    date.setHours(0, 0, 0, 0);
    return date;
  };

  const normalizeEndDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    date.setHours(23, 59, 59, 999);
    return date;
  };

  useEffect(() => {
    const applyFilters = () => {
      const result = myTransactions.filter((item) => {
        const typeTransaction = filters.typeTransaction
          ? item.typeTransaction?.description === filters.typeTransaction
          : true;

        const value = parseFloat(
          item.amount
            .replace('R$', '')
            .trim()
            .replace(/\./g, '')
            .replace(',', '.')
        );
        const min = filters.minimumValue
          ? parseFloat(
              filters.minimumValue.replace(/\./g, '').replace(',', '.')
            )
          : undefined;
        const max = filters.maximumValue
          ? parseFloat(
              filters.maximumValue.replace(/\./g, '').replace(',', '.')
            )
          : undefined;

        if (min !== undefined && isNaN(min)) return false;
        if (max !== undefined && isNaN(max)) return false;

        const minimumValue = min !== undefined ? value >= min : true;
        const maximumValue = max !== undefined ? value <= max : true;

        const itemDate = new Date(item.date);
        const matchStartDate = filters.startDate
          ? itemDate >= normalizeStartDate(filters.startDate)
          : true;
        const matchEndDate = filters.endDate
          ? itemDate <= normalizeEndDate(filters.endDate)
          : true;

        if (filters.startDate && filters.endDate) {
          const start = normalizeStartDate(filters.startDate);
          const end = normalizeEndDate(filters.endDate);
          if (start > end) {
            setFilterError(
              'A data de início não pode ser maior que a data de final.'
            );
            return false;
          }
        }

        if (min !== undefined && min < 0) {
          setFilterError('O valor mínimo não pode ser negativo.');
          return false;
        }

        if (max !== undefined && max < 0) {
          setFilterError('O valor máximo não pode ser negativo.');
          return false;
        }

        if (min !== undefined && max !== undefined && min > max) {
          setFilterError(
            'O valor mínimo não pode ser maior que o valor máximo.'
          );
          return false;
        }

        setFilterError('');

        return (
          typeTransaction &&
          minimumValue &&
          maximumValue &&
          matchStartDate &&
          matchEndDate
        );
      });

      setFilteredTransactions(result);
    };

    applyFilters();
  }, [filters, myTransactions]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Minhas Transferências</h2>

      <TransfersFilters
        filters={filters}
        onChange={handleFilterChange}
        onKeyDown={(e) => {
          if (['-', '+', 'e', 'E'].includes(e.key)) {
            e.preventDefault();
            setFilterError(
              'O valore mínimo e máximo deve conter apenas números.'
            );
            return;
          }
        }}
        onResetFilters={() =>
          setFilters({
            typeTransaction: '',
            minimumValue: '',
            maximumValue: '',
            startDate: '',
            endDate: '',
          })
        }
        error={filterError}
      />

      {filteredTransactions.length > 0 ? (
        <>
          {filteredTransactions
            .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
            .map((transaction, index) => (
              <TransferItem
                key={transaction.id || index}
                item={transaction}
                onDelete={() =>
                  handleTransactionDeleteConfirmation(transaction.id!)
                }
                onEdit={() => handleEditTransaction(transaction!)}
              />
            ))}
          {filteredTransactions.length > itemsPerPage && (
            <div className="flex justify-center mt-4 gap-2 items-center">
              {filteredTransactions.length > itemsPerPage &&
                currentPage > 0 && (
                  <Tooltip title="Página anterior">
                    <button
                      className="bg-primary rounded-full h-[40px] w-[40px] flex items-center justify-center cursor-pointer"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 0))
                      }
                    >
                      <ChevronLeftIcon style={{ color: 'white' }} />
                    </button>
                  </Tooltip>
                )}

              {filteredTransactions.length >
                (currentPage + 1) * itemsPerPage && (
                <Tooltip title="Próxima página">
                  <button
                    className="bg-primary rounded-full h-[40px] w-[40px] flex items-center justify-center cursor-pointer"
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(
                          prev + 1,
                          Math.floor(filteredTransactions.length / itemsPerPage)
                        )
                      )
                    }
                  >
                    <ChevronRightIcon style={{ color: 'white' }} />
                  </button>
                </Tooltip>
              )}
            </div>
          )}
        </>
      ) : (
        <p>Nenhuma transação encontrada.</p>
      )}

      {dialogType?.type === alertDialogTypes.DELETE && (
        <>
          <AlertDialog
            open={showConfirmDialog}
            type={'Delete'}
            setOpen={setShowConfirmDialog}
            handleConfirmSubmit={() => handleConfirmSubmit(id)}
            handleCancelSubmit={handleCancelSubmit}
            
          />

          <SuccessSnackbar
            open={showSuccess}
            onClose={() => setShowSuccess(false)}
            message={'Transação excluída com sucesso!'}
            duration={3000}
          />
        </>
      )}

      {dialogType?.type === alertDialogTypes.EDIT && (
        <>
          <AlertDialog
            open={showConfirmDialog}
            type={'Edit'}
            setOpen={setShowConfirmDialog}
            handleConfirmSubmit={() => {
              if (!edit.amount) return;
              handleConfirmEditSubmit(edit);
            }}
            handleCancelSubmit={() => handleCancelEdit()}
            children={buildTransactionEditForm(edit)}
          />

          <SuccessSnackbar
            open={showSuccess}
            onClose={() => setShowSuccess(false)}
            message={'Transação editada com sucesso!'}
            duration={3000}
          />
        </>
      )}
    </div>
  );
};

export default MyTransfers;
