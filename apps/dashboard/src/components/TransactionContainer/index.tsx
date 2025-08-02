import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import CurrencyInput from 'react-currency-input-field';
import { toast } from 'react-toastify';
import bgCardTransaction from '../../assets/img/bg-card-transaction.png';
import womanCreditCard from '../../assets/img/woman-credit-card.png';
import { alertDialogTypes } from '../../enums/alertDialogTypes';
import Button from '../Button';
import AlertDialog from '../Dialog';
import SuccessSnackbar from '../SuccessSnackbar';
import Title from '../Title';

import { ITransaction, ITypeTransaction } from '../../Models/transactionModels';
import { accountServices } from '../../services/Account/apiEndpoint';
import { transactionServices } from '../../services/Transacoes/apiEndpoints';
import { useTransaction } from '../../setup/context/transactionContext';
import { TAlertDialogType } from '../../types/TAlertDialogType';
import { IInputs } from '../../Models/formModels';

type TFormTransaction = {
  onlyTransactionEditing?: () => void;
};

const FormTransaction = ({ onlyTransactionEditing }: TFormTransaction) => {
  const {
    id,
    setId,
    typeTransactionEdit,
    valueEdit,
    setExtract,
    setTypeTransactionEdit,
    setBalance,
  } = useTransaction();
  const [inputKey, setInputKey] = useState(0);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [dialogType, setDialogType] = useState<TAlertDialogType>({
    type: alertDialogTypes.CONFIRM,
  });
  const [pendingFormData, setPendingFormData] = useState<ITransaction | null>(
    null
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const [idTemp, setIdTemp] = useState('');

  const [typeTransactionOptions, setTypeTransactionOptions] = useState<
    ITypeTransaction[]
  >(() => {
    return [
      { id: '1', description: 'Câmbio e Moedas' },
      { id: '2', description: 'DOC/TED' },
      { id: '3', description: 'Empréstimo e Financiamento' },
    ];
  });

  const [valueWatched, setValueWatched] = useState<string>('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm<IInputs>();

  const handleNew = () => {
    // reset({ value: "" });
    setInputKey((prev) => prev + 1);
  };

  useEffect(() => {
    if (!typeTransactionOptions || typeTransactionOptions.length === 0) return;
    if (id) {
      setValueWatched(valueEdit);
      setValue('typeTransaction', typeTransactionEdit.id);
    }

    if (!id) {
      setValueWatched('');
      setValue('value', '');
      setValue('typeTransaction', '');
      setTypeTransactionEdit({ id: '', description: '' });
    }
  }, [id, typeTransactionOptions]);

  const onSubmit: SubmitHandler<IInputs> = async () => {
    const optionId = watch('typeTransaction');
    const typeDescription =
      typeTransactionOptions.find((option) => option.id === optionId)
        ?.description || '';
    const _valueNew = watch('value');

    const form: ITransaction = {
      typeTransaction: { id: optionId, description: typeDescription },
      //   amount: id ? valueWatched : _valueNew,
      // amount: 0 ? valueWatched : _valueNew,
      amount: 0 ? '' : _valueNew,
      date: new Date().toISOString(),
      accountNumber: '123456789',
    };
    setPendingFormData(form);
    setShowConfirmDialog(true);
  };

  const handleConfirmSubmit = async () => {
    if (!pendingFormData) return;

    if (id) {
      await transactionServices.update(id, pendingFormData);
      setIdTemp(id);
    } else {
      await transactionServices.create(pendingFormData);
      handleNew();
      setIdTemp('');
    }

    const response = await transactionServices.getAll();
    setExtract(response || []);
    handlerUpdateAccount(response || []);

    setPendingFormData(null);
    setShowConfirmDialog(false);

    toast.dismiss();
    setShowSuccess(true);

    setId('');
    reset();
  };

  const calculateTotalAmount = (responseData: ITransaction[]) => {
    return responseData.reduce((total, item) => {
      const amount = parseFloat(
        item.amount.replace('R$', '').trim().replace('.', '').replace(',', '.')
      );
      return total + amount;
    }, 0);
  };

  const handleOnlyTransactionEditing = () => {
    if (id) {
      setDialogType({ type: alertDialogTypes.EDIT });
    }

    if (!id) {
      setDialogType({ type: alertDialogTypes.CONFIRM });
    }

    if (onlyTransactionEditing) {
      onlyTransactionEditing();
    }
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

  const handleCancelTransaction = () => {
    reset();
    setId('');
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative bg-gray-300 min-h-[633px] w-full min-w-[280px] rounded-[10px] shadow-md p-6 text-tertiary z-2"
        id="transaction-form"
      >
        <img
          width={146}
          height={144}
          src={bgCardTransaction}
          alt={'Fundo quadriculado do card de transação financeira'}
          className="absolute top-0 right-0 max-h-[144px] max-w-[146px] z-[-1]"
        />

        <fieldset className="flex flex-col">
          <Title
            text={0 ? 'Editar transação' : 'Nova transação'}
            titleForID="type-transaction-option"
            size="xlarge"
            otherClasses={['mb-5']}
          />

          <select
            id="type-transaction-option"
            className="w-full md:w-[355px] h-[48px] border-solid border-1 border-primary rounded p-16 bg-white text-black px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none mb-3"
            {...register('typeTransaction', { required: true })}
          >
            <option value="">Selecione uma opção</option>
            {typeTransactionOptions &&
              typeTransactionOptions.length > 0 &&
              typeTransactionOptions.map((option) => {
                return (
                  <option key={option.id} value={option.id}>
                    {option.description}
                  </option>
                );
              })}
          </select>

          {errors.typeTransaction && (
            <Title
              text="* Campo obrigatório"
              titleForID="type-transaction-option"
              size="small"
              otherClasses={['mb-3', 'text-red-600', 'font-medium']}
            />
          )}
        </fieldset>

        <fieldset className="flex flex-col mb-6">
          <Title
            text="Valor"
            titleForID="value"
            size="medium"
            otherClasses={['mb-3']}
          />

          <CurrencyInput
            key={id ? `edit-${id}` : `create-${inputKey}`}
            defaultValue={id ? valueWatched : 0}
            className="w-full md:w-[250px] h-[48px] border border-primary rounded bg-white text-black px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none mb-3"
            onChangeValue={(event, originalValue, maskedValue) => {
              console.log(event, originalValue, maskedValue);
              setValueWatched(maskedValue as string);
            }}
            {...(register('value', { required: true }) as any)}
            InputElement={<input type="text" placeholder="R$ 0,00" />}
          />

          {errors.value && (
            <Title
              text="* Campo obrigatório"
              titleForID="value"
              size="small"
              otherClasses={['mb-3', 'text-red-600', 'font-medium']}
            />
          )}
        </fieldset>

        <section className="flex gap-2 max-md:flex-wrap">
          <Button
            primary
            type="submit"
            onClick={() => handleOnlyTransactionEditing()}
            label={id ? 'Atualizar transação' : 'Concluir transação'}
          />
          {id && (
            <Button
              type="button"
              label="Cancelar"
              onClick={() => {
                handleCancelTransaction();
                handleOnlyTransactionEditing();
              }}
            />
          )}
        </section>

        <img
          width={283}
          height={228}
          src={womanCreditCard}
          alt={'Ícone de mulher com cartão de crédito'}
          className="absolute bottom-5 right-5 max-h-[228px] max-w-[283px] z-[-1]"
        />

        <img
          width={283}
          height={228}
          src={bgCardTransaction}
          alt={'Fundo quadriculado do card de transação financeira'}
          className="absolute bottom-0 left-0 max-h-[177px] max-w-[180px] rotate-180 z-[-1]"
        />
      </form>
      {
        <AlertDialog
          type={dialogType.type}
          open={showConfirmDialog}
          setOpen={setShowConfirmDialog}
          handleConfirmSubmit={handleConfirmSubmit}
        />
      }

      {
        <SuccessSnackbar
          open={showSuccess}
          onClose={() => setShowSuccess(false)}
          message={
            idTemp
              ? 'Transação alterada com sucesso!'
              : 'Transação realizada com sucesso!'
          }
          duration={3000}
        />
      }
    </>
  );
};

export default FormTransaction;
