import { useEffect, useState } from 'react';
import { ITransaction } from '../../Models/transactionModels';
import { transactionServices } from '../../services/Transacoes/apiEndpoints';
import TransferItem from './TransferItem';
import { formatDate, sortExtractByAscDate } from '../../utils/formatters';
import AlertDialog from '../Dialog';
import SuccessSnackbar from '../SucessSnackBar';
import { alertDialogTypes } from '../../enums/alertDialogTypes';
import { TAlertDialogType } from '../../types/TAlertDialogType';
import { useTransaction } from '../../setup/context/transactionContext';
import { accountServices } from '../../services/Account/apiEndpoint';
import { toast } from 'react-toastify';
import { Paper, SxProps, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React from 'react';

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

  const { setTypeTransactionEdit, setValueEdit } = useTransaction();

  const handleEditTransaction = ({
      id,
      typeTransaction,
      amount,
    }: ITransaction) => {
      setId(id!);
      setTypeTransactionEdit(typeTransaction);
      setValueEdit(amount);
    };

  /**
   * Pagination
   */
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  interface Column {
    id: 'id' | 'date' | 'description' | 'amount' | 'edit' | 'delete';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: number | string) => string;
    formatIdDate?: (value: string) => string;
  }

  const tableContainerSx: SxProps = {
    width: '100%',
    marginLeft: 'auto',
    borderRadius: '10px',
    overflow: 'hidden',
    border: '1px solid #004d61',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#e4ede3',
    color: '#004d61',
  }

  /**
   * Columns
   */
  const columns: readonly Column[] = [
    { id: 'description', label: 'Tipo da Transação', minWidth: 100 },
    {
      id: 'date',
      label: 'Data',
      minWidth: 170,
      align: 'right',
      formatIdDate: (value: string) => formatDate(value || ''),
    },
    {
      id: 'amount',
      label: 'Valor Transação',
      minWidth: 100,
      align: 'right',
      format: (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
    },
    {
      id: 'edit',
      label: 'Editar',
      minWidth: 10,
      align: 'left',
    },
    {
      id: 'delete',
      label: 'Excluir',
      minWidth: 10,
      align: 'left',
    }
  ];


  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md" style={{ padding: '3%' }}>
      <h2 className="text-2xl font-bold mb-7">Minhas Transferências</h2>

      <Paper sx={tableContainerSx}>
      <TableContainer >
        <Table stickyHeader={true} aria-label="sticky table" >
          <TableHead sx={{ backgroundColor: '#004d61', color: '#004d61', fontWeight: 'bold' }}>
            <TableRow >
              {columns.map((column) => (
                <TableCell sx={{  fontWeight: 'bold', fontSize: '17px' }}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={{ 
            "& tr:nth-of-type(2n+1)": {
              backgroundColor: 'grey.100',
            }
           }}>
            {myTransactions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value =
                        column.id === 'description'
                          ? row.typeTransaction.description
                          : column.id === 'date'
                          ? formatDate(row[column.id] || '')
                          : row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : column.id === "edit" ? (
                            <button
                              title="Editar"
                              className="bg-primary rounded-full h-[40px] w-[40px] flex items-center justify-center cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditTransaction(row);
                                
                              }}
                            >
                              <DriveFileRenameOutlineIcon style={{ color: 'white' }} />
                            </button>
                          ) : (
                            column.id === "delete" ?
                            (
                              <button
                                title="Excluir"
                                className="bg-primary rounded-full h-[40px] w-[40px] flex items-center justify-center cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleTransactionDeleteConfirmation(row.id!);
                                }}
                              >
                                <DeleteForeverIcon style={{ color: 'white' }} />
                              </button>
                            )
                            :
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 25, 100]}
        component="div"
        count={myTransactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>


      {/* {myTransactions.length > 0 ? (
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
      )} */}

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
