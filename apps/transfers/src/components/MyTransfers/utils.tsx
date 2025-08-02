import CurrencyInput from 'react-currency-input-field';
import { ITransaction, ITypeTransaction } from '../../Models/transactionModels';
import Title from '../Title';

export const buildTransactionEditForm = (transactionItem: ITransaction) => {
  const typeTransactionOptions: ITypeTransaction[] = [
    { id: '1', description: 'Câmbio e Moedas' },
    { id: '2', description: 'DOC/TED' },
    { id: '3', description: 'Empréstimo e Financiamento' },
  ];

  const handleEditTypeTransaction = (typeTransaction: ITypeTransaction) => {
    transactionItem.typeTransaction = typeTransaction;
  };

  const handleEditAmountTransaction = (amount: string) => {
    transactionItem.amount = amount;
  };

  return (
    <>
      <fieldset className="flex flex-col">
        <Title
          text="*Campo obrigatório"
          titleForID="type-transaction-option"
          size="small"
          otherClasses={['mb-3', 'text-red-600', 'font-medium', 'self-start']}
        />

        <select
          id="type-transaction-option"
          className="w-full md:w-[355px] h-[48px] border-solid border-1 border-primary rounded p-16 bg-white text-black px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none mb-3"
          defaultValue={
            typeTransactionOptions.find(
              (option) =>
                transactionItem.typeTransaction.description ===
                option.description
            )?.id || ''
          }
          onChange={(e) => {
            const selectedOption = typeTransactionOptions.find(
              (option) => option.id === e.target.value
            );
            if (selectedOption) {
              handleEditTypeTransaction(selectedOption);
            }
          }}
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
      </fieldset>

      <fieldset className="flex flex-col mb-6">
        <Title
          text="*Campo obrigatório"
          titleForID="value"
          size="small"
          otherClasses={['mb-3', 'text-red-600', 'font-medium', 'self-start']}
        />
        
        <CurrencyInput
          key={`edit-${transactionItem.id}`}
          className="w-full md:w-[250px] h-[48px] border border-primary rounded bg-white text-black px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none mb-3"
          defaultValue={transactionItem.amount.replace('R$', '').replace('.', '')}
          intlConfig={{ locale: "pt-BR", currency: "BRL" }}
          decimalsLimit={2}
          decimalSeparator=","
          groupSeparator="."
          placeholder="R$ 0,00"
          onValueChange={(event, originalValue, maskedValue) => {
            const valueWithoutCurrencySymbol = maskedValue.formatted.replace('R$', '');
            handleEditAmountTransaction(valueWithoutCurrencySymbol);
          }}
        />
      </fieldset>
    </>
  );
};
