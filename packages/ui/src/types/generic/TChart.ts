export type TransactionChartProps = {
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
  OnResetFilter?: () => void;
  filterDisabled?: boolean;
};