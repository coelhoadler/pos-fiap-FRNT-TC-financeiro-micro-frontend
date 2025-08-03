import { Link } from '@mui/material';
import React from 'react';
import { ITransaction } from '../../Models/transactionModels';
import { useTransaction } from '../../setup/context/transactionContext';
import { formatDate, formatTime } from '../../utils/formatters';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

interface TransactionItemProps {
  item: Partial<ITransaction>;
  onDelete: (transactionId: string) => void;
  onEdit?: () => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  item,
  onDelete,
  onEdit,
  ...props
}) => {
  const { setId, setTypeTransactionEdit, setValueEdit } = useTransaction();

  const handleEditTransaction = ({
    id,
    typeTransaction,
    amount,
  }: ITransaction) => {
    setId(id!);
    setTypeTransactionEdit(typeTransaction);
    setValueEdit(amount);
  };

  const handleValueFormat = (value: string) => {
    return parseFloat(
      value.replace('R$', '').trim().replace(/\./g, '').replace(',', '.')
    ).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="mb-4 pb-4 border-b border-link" {...props}>
      <span className="text-link font-semibold">
        {formatDate(item.date || '')}
      </span>
      <span className="ml-3 text-sm text-gray-500">
        {formatTime(item.date || '')}
      </span>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-md">{item.typeTransaction?.description}</p>
          <p
            className={`text-md font-bold ${
              parseFloat(item.amount || '0') < 0 ? 'text-red-600' : 'text-black'
            }`}
          >
            {parseFloat(item.amount || '0') < 0 ? '-' : ''}{' '}
            {handleValueFormat(item.amount) || '0'}
          </p>
        </div>
        <p className={'text-sm flex flex-col gap-3.5 text-white'}>
          <button
            title="Editar"
            className="bg-primary rounded-full h-[40px] w-[40px] flex items-center justify-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleEditTransaction(item as ITransaction);
              onEdit?.();
            }}
          >
            <DriveFileRenameOutlineIcon sx={{
              color: 'white',
              cursor: 'pointer',
              transition: 'color 0.3s',
              '&:hover': {
                color: '#8aec49',
              },
            }} />

          </button>

          <button
            title="Excluir"
            className="bg-primary rounded-full h-[40px] w-[40px] flex items-center justify-center cursor-pointer"
            onClick={() => onDelete(item.id || '')}
          >
            <DeleteForeverIcon sx={{
              color: 'white',
              cursor: 'pointer',
              transition: 'color 0.3s',
              '&:hover': {
                color: '#8d4d48', 
              },
             }} />
          </button>
        </p>
      </div>
    </div>
  );
};

export default TransactionItem;
