import { useState } from 'react';
import { ITypeTransaction } from '../../Models/transactionModels';
import { useTransaction } from '../../setup/context/transactionContext';
import AccountStatement from '../AccountStatement';
import CardBalance from '../CardBalance';
import Charts from '../Charts';
import FormTransaction from '../TransactionContainer';

export default function Home({ username }: { username: string }) {
  const { extract, balance } = useTransaction();

  const [typeTransactionOptions, setTypeTransactionOptions] = useState<
    ITypeTransaction[]
  >(() => {
    return [
      { id: '1', description: 'Câmbio e Moedas' },
      { id: '2', description: 'DOC/TED' },
      { id: '3', description: 'Empréstimo e Financiamento' },
    ];
  });

  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [dateFilterActive, setDateFilterActive] = useState(false);
  const [dateError, setDateError] = useState<string>('');

  function handleStartDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setStartDate(value);
    setDateFilterActive(!!endDate || !!value);

    if (endDate && value > endDate) {
      setDateError('A data inicial não pode ser maior que a data final.');
    } else {
      setDateError('');
    }
  }

  function handleEndDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setEndDate(value);
    setDateFilterActive(!!startDate || !!value);

    if (startDate && startDate > value) {
      setDateError('A data inicial não pode ser maior que a data final.');
    } else {
      setDateError('');
    }
  }

  function getSumByType(typeId: string) {
    return extract
      .filter((item) => {
        const transactions = item.typeTransaction.id === typeId;
        if (!dateFilterActive) return transactions;

        const itemDateTransaction = item.date?.slice(0, 10);
        const afterStart = !startDate || itemDateTransaction >= startDate;
        const beforeEnd = !endDate || itemDateTransaction <= endDate;

        return transactions && afterStart && beforeEnd;
      })
      .reduce((sum, item) => {
        const value = parseFloat(
          item.amount
            .replace('R$', '')
            .trim()
            .replace('.', '')
            .replace(',', '.')
        );
        return sum + (isNaN(value) ? 0 : value);
      }, 0);
  }
  const chartData = typeTransactionOptions
    .map((type) => ({
      label: (location: string) =>
        location === 'tooltip' ? '' : type.description,
      value: getSumByType(type.id),
    }))
    .filter((item) => item.value > 0);

  const hasData = chartData.length > 0;

  return (
    <div className="flex w-full h-full gap-3 mx-auto max-lg:flex-col">
      <div className="flex flex-col bg-white rounded-[8px] shadow-md p-5 w-full gap-4">
        <CardBalance balance={balance || 0} username={username} />

        <div className="bg-gray-200 rounded-[8px] shadow-md p-5 w-full">
          <Charts
            onEndDateChange={handleEndDateChange}
            onStartDateChange={handleStartDateChange}
            startDate={startDate}
            endDate={endDate}
            error={dateError}
            hasNoTransactions={hasData}
            data={chartData}
          />
        </div>

        <FormTransaction />
      </div>

      <div className="min-w-[350px]">
        <AccountStatement />
      </div>
    </div>
  );
}
