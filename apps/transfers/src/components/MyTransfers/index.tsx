import { useEffect, useState } from "react";
import { ITransaction } from "../../Models/transactionModels";
import { transactionServices } from "../../services/Transacoes/apiEndpoints";
import TransferItem from "./TransferItem";
import { sortExtractByAscDate } from "../../utils/formatters";

const MyTransfers = () => {
  const [myTransactions, setMyTransactions] = useState<ITransaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<ITransaction[]>([]);
  const [filterError, setFilterError] = useState("");

  const [filters, setFilters] = useState({
    typeTransaction: "",
    minimumValue: "",
    maximumValue: "",
    startDate: "",
    endDate: "",
  });

  
  const normalizeStartDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-");
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    date.setHours(0, 0, 0, 0); 
    return date;
  };

  const normalizeEndDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-");
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    date.setHours(23, 59, 59, 999);
    return date;
  };

  useEffect(() => {
    const fetchTransaction = async () => {
      const responseData = await transactionServices.getAll();
      const extractOrdered = sortExtractByAscDate(responseData || []);
      setMyTransactions(extractOrdered);
    };

    fetchTransaction();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      const result = myTransactions.filter((item) => {
        const typeTransaction = filters.typeTransaction
          ? item.typeTransaction?.description === filters.typeTransaction
          : true;

        const value = Number(item.amount);
        const minimumValue = filters.minimumValue
          ? value >= Number(filters.minimumValue)
          : true;
        const maximumValue = filters.maximumValue
          ? value <= Number(filters.maximumValue)
          : true;

        const itemDate = new Date(item.date);

        const matchStartDate = filters.startDate
          ? itemDate >= normalizeStartDate(filters.startDate)
          : true;

        const matchEndDate = filters.endDate
          ? itemDate <= normalizeEndDate(filters.endDate)
          : true;

        // Validações
        if (filters.startDate && filters.endDate) {
          const start = normalizeStartDate(filters.startDate);
          const end = normalizeEndDate(filters.endDate);
          if (start > end) {
            setFilterError("A data de início não pode ser maior que a data de fim.");
            return false;
          }
        }

        if (Number(filters.minimumValue) < 0) {
          setFilterError("O valor mínimo não pode ser negativo.");
          return false;
        }

        if (Number(filters.maximumValue) < 0) {
          setFilterError("O valor máximo não pode ser negativo.");
          return false;
        }

        if (
          filters.minimumValue &&
          filters.maximumValue &&
          Number(filters.minimumValue) > Number(filters.maximumValue)
        ) {
          setFilterError("O valor mínimo não pode ser maior que o valor máximo.");
          return false;
        }

        setFilterError("");

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
    setFilters((item) => ({ ...item, [name]: value }));
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Minhas Transferências</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select
          name="typeTransaction"
          value={filters.typeTransaction}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="">Todos os Tipos</option>
          <option value="Câmbio e Moedas">Câmbio e Moedas</option>
          <option value="DOC/TED">DOC/TED</option>
          <option value="Empréstimo e Financiamento">Empréstimo e Financiamento</option>
        </select>

        <input
          type="number"
          name="minimumValue"
          min={0}
          placeholder="Valor mínimo"
          value={filters.minimumValue}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />

        <input
          type="number"
          min={0}
          name="maximumValue"
          placeholder="Valor máximo"
          value={filters.maximumValue}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />

        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />

        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />
      </div>

      {filterError ? (
        <p className="text-red-500 mb-4">{filterError}</p>
      ) : (
        <>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction, index) => (
              <TransferItem
                key={transaction.id || index}
                item={transaction}
                onDelete={() => {}}
              />
            ))
          ) : (
            <p>Nenhuma transação encontrada.</p>
          )}
        </>
      )}
    </div>
  );
};

export default MyTransfers;
