import React from "react";
import Stack from "@mui/material/Stack";
import { PieChart } from "@mui/x-charts/PieChart";

type TCharts = {
  data: {
    label: (location: string) => string;
    value: number;
  }[];
};

const Charts = ({ data }: TCharts) => {
  return (
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
            innerRadius: 60,
            outerRadius: 80,
            valueFormatter: ({ value }) =>
              value.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              }),
            data,
          },
        ]}
        width={200}
        height={200}
        slotProps={{
          legend: {
            direction: "horizontal",
            position: { vertical: "bottom", horizontal: "center" },
            className: "flex w-full justify-start flex-wrap gap-2",
          },
        }}
      />
    </Stack>
  );
};

export default Charts;
