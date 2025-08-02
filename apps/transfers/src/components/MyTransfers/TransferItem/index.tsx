import React from 'react';
import { ITransaction } from '../../../Models/transactionModels';
import { useTransaction } from '../../../setup/context/transactionContext';
import { formatDate, formatTime } from '../../../utils/formatters';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import axios from 'axios';
import { toast } from 'react-toastify';

interface TransactionItemProps {
  item: Partial<ITransaction>;
  onDelete: (transactionId: string) => void;
  onEdit?: () => void;
}

const TransferItem: React.FC<TransactionItemProps> = ({
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

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        const formData = new FormData();
        const API_BASE_URL = 'http://localhost:3000';
        const url = `${API_BASE_URL}/api/transactions/${id}/upload-image`;
        formData.append('file', file);

        const response = await axios.patch(url, formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('File uploaded successfully:', response.data);
        toast.success('File uploaded successfully.');
      } catch (error) {
        console.error('Error uploading file:', error);
        toast.error('Error uploading file.');
      }
    }
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
            R$ {parseFloat(item.amount || '0') < 0 ? '-' : ''} {item.amount || '0'}
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
            <DriveFileRenameOutlineIcon style={{ color: 'white' }} />
          </button>
          <button
            title="Excluir"
            className="bg-primary rounded-full h-[40px] w-[40px] flex items-center justify-center cursor-pointer"
            onClick={() => onDelete(item.id || '')}
          >
            <DeleteForeverIcon style={{ color: 'white' }} />
          </button>

          <input
            type='file'
            className='hidden'
            id={`file-${item.id}`}
            accept='image/*'
            onChange={(event) => handleFileChange(event, item.id)}
          />
          <label
            htmlFor={`file-${item.id}`}
            className="bg-primary rounded-full h-[40px] w-[40px] flex items-center justify-center cursor-pointer"
            title='Anexar comprovante'
          >
            <FilePresentIcon style={{ color: 'white' }} />
          </label>
        </p>
      </div>
    </div>
  );
};

export default TransferItem;
