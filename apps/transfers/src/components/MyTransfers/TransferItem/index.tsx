import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { ITransaction } from '../../../Models/transactionModels';
import { useTransaction } from '../../../setup/context/transactionContext';
import { formatDate, formatTime } from '../../../utils/formatters';
import SuccessSnackbar from '../../SucessSnackBar';

interface TransactionItemProps {
  item: Partial<ITransaction>;
  onDelete: (transactionId: string) => void;
  onEdit: (transactionItem: ITransaction) => void;
}

const TransferItem: React.FC<TransactionItemProps> = ({
  item,
  onDelete,
  onEdit,
  ...props
}) => {
  const { setId, setTypeTransactionEdit, setValueEdit } = useTransaction();
  const [showSuccess, setShowSuccess] = useState(false);

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

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const sizeAllowed = file.size < 1 * 1024 * 1024; // 1MB

      if (!sizeAllowed) {
        console.error('File size exceeds 1MB limit.');
        return false;
      }

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

        setShowSuccess(true);

        setTimeout(() => {
          window.location.reload();
        }, 4000);
      } catch (error) {
        if (error.status === 401) {
          toast.error('Sessão expirada, por favor faça login novamente.');
          window.location.href = '/login';
        }

        console.error('Error uploading file:', error);
        toast.error('Error uploading file.');
      }
    }
  };

  const handleDownloadBase64 = (base64: string, mimeType: string) => {
    const link = document.createElement('a');
    link.href = `data:${mimeType};base64,${base64}`;
    link.download =
      'comprovante_' + new Date().getTime() + '.' + mimeType.split('/')[1];
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            onClick={() => {
              handleEditTransaction(item as ITransaction);
              onEdit(item as ITransaction);
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

          {item.base64Image ? (
            <label
              htmlFor={`file-${item.id}`}
              className="bg-green-600 rounded-full h-[40px] w-[40px] flex items-center justify-center cursor-pointer"
              title="Baixar comprovante"
              onClick={() =>
                handleDownloadBase64(item.base64Image!, item.fileMimetype!)
              }
            >
              <FileDownloadIcon style={{ color: 'white' }} />
            </label>
          ) : (
            <>
              <input
                type="file"
                className="hidden"
                id={`file-${item.id}`}
                accept="image/*"
                onChange={(event) => handleFileChange(event, item.id)}
              />
              <label
                htmlFor={`file-${item.id}`}
                className="bg-primary rounded-full h-[40px] w-[40px] flex items-center justify-center cursor-pointer"
                title="Anexar comprovante"
              >
                <FilePresentIcon style={{ color: 'white' }} />
              </label>
            </>
          )}
        </p>
      </div>

      <SuccessSnackbar
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        message={'Arquivo adicionado com sucesso!'}
        duration={3000}
      />
    </div>
  );
};

export default TransferItem;
