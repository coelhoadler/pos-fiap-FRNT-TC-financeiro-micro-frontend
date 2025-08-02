import React from "react";
import Stack from "@mui/material/Stack";
import { PieChart } from "@mui/x-charts/PieChart";

type TCharts = {
  data: {
    label: (location: string) => string;
    value: number;
  }[];
  hasNoTransactions?: boolean;
  error?: string;
  endDate?: string;
  startDate?: string;   
  onStartDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEndDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Charts = ({ data, hasNoTransactions, error, startDate, endDate, onStartDateChange, onEndDateChange }: TCharts) => {
  return (
    <>
      <h2 className="text-center text-xl font-family-base text-primary font-bold mb-4">
        Gráfico de transações
      </h2>

      <div className="flex gap-2 flex-col mb-4">
        <label className="text-primary text-sm font-bold font-family-base mb-1">
          Busque a transação por data
        </label>
        <div className="flex gap-4">
          <div className="flex flex-col mb-1  w-1/2">
            <label className="text-primary text-sm font-normal font-family-base mb-1 ">
              De:
            </label>
            <input
              type="date"
              value={startDate}
              onChange={onStartDateChange}
              className="border border-primary w-full  focus:outline-none focus:shadow-md focus-visible:shadow-md  h-[40px]  px-2 rounded cursor-pointer text-primary text-sm font-family-base "
            />
          </div>
          <div className="flex flex-col mb-1 w-1/2">
            <label className="text-primary text-sm font-normal font-family-base mb-1 ">
              Até:
            </label>
            <input
              type="date"
              value={endDate}
              onChange={onEndDateChange}
              className="border border-primary w-full  focus:outline-none focus:shadow-md focus-visible:shadow-md  h-[40px]  px-2 rounded cursor-pointer text-primary text-sm font-family-base "
            />
          </div>
        </div>
      </div>
      {error ? (
        <p className="text-center text-red-500 py-8 font-semibold">{error}</p>
      ) : hasNoTransactions ? (
        <Stack
          width="100%"
          direction="column"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <PieChart
            colors={["#004d61", "#47a138", "#ff5031"]}
            series={[
              {
                paddingAngle: 3,
                innerRadius: 70,
                outerRadius: 100,
                valueFormatter: ({ value }) =>
                  value.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  }),
                data,
              },
            ]}
            height={250}
            width={250}
            slotProps={{
              legend: {
                direction: "horizontal",
                position: { vertical: "bottom", horizontal: "center" },
                className: "flex w-full justify-start flex-wrap gap-2",
              },
            }}
          />
        </Stack>
      ) : (
        <p className="text-center text-gray-500 py-8 font-semibold">
          Nenhuma transferência encontrada no período selecionado.
        </p>
      )}
    </>
  );
};

export default Charts;
