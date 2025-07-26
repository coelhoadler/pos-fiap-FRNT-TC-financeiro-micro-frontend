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
            {parseFloat(item.amount || '0') < 0 ? '-' : ''} {item.amount || '0'}
          </p>
        </div>
        <p className={'text-sm flex flex-col gap-3.5 text-white'}>
          <Link href="#transaction-form" onClick={(e) => e.preventDefault()}>
            <button
              title="Editar"
              className="bg-primary rounded-full h-[40px] w-[40px] flex items-center justify-center cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleEditTransaction(item as ITransaction);
                onEdit?.();
              }}
            >
              <DriveFileRenameOutlineIcon style={{ color: 'white' }} />
            </button>
          </Link>
          <button
            title="Excluir"
            className="bg-primary rounded-full h-[40px] w-[40px] flex items-center justify-center cursor-pointer"
            onClick={() => onDelete(item.id || '')}
          >
            <DeleteForeverIcon style={{ color: 'white' }} />
          </button>
        </p>
      </div>
    </div>
  );
};

export default TransactionItem;
