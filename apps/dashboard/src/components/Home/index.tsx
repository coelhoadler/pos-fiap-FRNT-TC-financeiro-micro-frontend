import { useEffect, useState } from "react";
import { IAccount } from "../../Models/accountModels";
import { accountServices } from "../../services/Account/apiEndpoint";
import AccountStatement from "../AccountStatement";
import CardBalance from "../CardBalance";
import FormTransaction from "../TransactionContainer";
import Charts from "../Charts";
import { ITypeTransaction } from "../../Models/transactionModels";
import { useTransaction } from "../../setup/context/transactionContext";

export default function Home({ username }: { username: string }) {
  let accountStart: Partial<IAccount>;
  const { extract } = useTransaction();

  const [typeTransactionOptions, setTypeTransactionOptions] = useState<
    ITypeTransaction[]
  >(() => {
    return [
      { id: "1", description: "Câmbio e Moedas" },
      { id: "2", description: "DOC/TED" },
      { id: "3", description: "Empréstimo e Financiamento" },
    ];
  });

  function getSumByType(typeId: string) {
    return extract
      .filter((item) => item.typeTransaction.id === typeId)
      .reduce((sum, item) => {
        const value = parseFloat(
          item.amount
            .replace("R$", "")
            .trim()
            .replace(".", "")
            .replace(",", ".")
        );
        return sum + (isNaN(value) ? 0 : value);
      }, 0);
  }

  const chartData = typeTransactionOptions.map((type) => ({
    label: (location: string) =>
      location === "tooltip" ? "" : type.description,
    value: getSumByType(type.id),
  }));

  useEffect(() => {
    const fetchAccountStart = async () => {
      try {
        accountStart = await accountServices.getAccountById("123456789"); // Joana accountNumber is 123456789;
      } catch (error) {
        accountStart = { balance: 0 };
      }
    };
    fetchAccountStart();
  }, []);

  return (
    <div className="flex w-full h-full gap-3 mx-auto max-lg:flex-col">
      <div className="flex flex-col bg-white rounded-[8px] shadow-md p-5 w-full gap-4">
        <CardBalance balance={accountStart?.balance || 0} username={username} />
        <div className="bg-gray-200 rounded-[8px] shadow-md p-5 w-full">
          <Charts data={chartData} />
        </div>
        <FormTransaction />
      </div>
      <div className="min-w-[350px]">
        <AccountStatement />
      </div>
    </div>
  );
}
