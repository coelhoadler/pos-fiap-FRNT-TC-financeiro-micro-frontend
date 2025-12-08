import React from 'react';
import { useTransaction } from '../../setup/context/transactionContext';
import { formatDate, formatTime } from '../../utils/formatters';
import { Button } from '@financeiro/ui';
import { ITransactionData } from '../../../../../libs/api-client/src/Models/transactionModels';

// TODO Colocar está interface em um arquivo separado
interface TransactionItemProps {
  item: Partial<ITransactionData>;
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
  }: ITransactionData) => {
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
            className={`text-md font-bold ${parseFloat(item.amount || '0') < 0 ? 'text-red-600' : 'text-black'
              }`}
          >
            {parseFloat(item.amount || '0') < 0 ? '-' : ''}{' '}
            {handleValueFormat(item.amount) || '0'}
          </p>
        </div>
        <div className={'flex flex-col gap-3.5 '}>

          <Button variant="edit" text="Editar" onClick={(e) => {
            e.stopPropagation();
            handleEditTransaction(item as ITransactionData);
            onEdit?.();
          }} />
          <Button variant="delete" text="Excluir" onClick={() => onDelete(item.id || '')} />
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
