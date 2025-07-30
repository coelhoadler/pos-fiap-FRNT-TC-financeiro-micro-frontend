import { useEffect, useState } from "react";
import { ITransaction } from "../../Models/transactionModels";
import { transactionServices } from "../../services/Transacoes/apiEndpoints";
import TransferItem from "./TransferItem";
import { sortExtractByAscDate } from "../../utils/formatters";

const MyTransfers = () => {
  const [myTransactions, setMyTransactions] = useState<ITransaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    ITransaction[]
  >([]);
  const [filterError, setFilterError] = useState("");

  const [filters, setFilters] = useState({
    typeTransaction: "",
    minimumValue: "",
    maximumValue: "",
    startDate: "",
    endDate: "",
  });

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
        const data = new Date(item.date);
        const matchStartDate = filters.startDate
          ? data >= new Date(filters.startDate)
          : true;
        const matchEndDate = filters.endDate
          ? data <= new Date(filters.endDate)
          : true;

        if (matchStartDate > matchEndDate) {
          setFilterError(
            "A data de início não pode ser posterior à data de fim."
          );
          return;
        }
        if (parseFloat(filters.minimumValue) < 0) {
          setFilterError("O valor mínimo não pode ser negativo. ");
          return;
        }
        if (parseFloat(filters.maximumValue) < 0) {
          setFilterError("O valor máximo não pode ser negativo. ");
          return;
        }
        if (parseFloat(filters.minimumValue) > parseFloat(filters.maximumValue)) {
          setFilterError(
            "O valor mínimo não pode ser maior que o valor máximo."
          );
          return;
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
          <option value="Empréstimo e Financiamento">
            Empréstimo e Financiamento
          </option>
        </select>

        <input
          type="number"
          name="minimumValue"
          placeholder="Valor mínimo"
          value={filters.minimumValue}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />

        <input
          type="number"
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
      {/* {myTransactions.length > 0 ? (
        myTransactions.map((transaction, index) => (
          <TransferItem key={index} item={transaction} onDelete={() => {}} />
        ))
      ) : (
        <p>Nenhuma transação encontrada.</p>
      )} */}
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
