import React, { useEffect, useState } from "react";
import Button from "../../Button";
import CurrencyInput from "react-currency-input-field";

type TTransfersFilters = {
  filters: {
    typeTransaction: string;
    minimumValue: string;
    maximumValue: string;
    startDate: string;
    endDate: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onResetFilters: () => void;
  error?: string;
  onKeyDown?: (
    e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

type TTransfersFiltersItem = {
  name: string;
  value: string;
  placeholder?: string;
  min?: number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  type?: string;
  className?: string;
  typeItem: "select" | "input" | "currency";
  onKeyDown?: (
    e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

type TTransfersFiltersLabels = {
  text: string;
  className?: string;
  style?: React.CSSProperties;
};
type TTransfersFiltersItemContainer = {
  children?: React.ReactNode;
  className?: string;
};

const TransfersFiltersItemContainer = ({
  children,
  className,
}: TTransfersFiltersItemContainer) => {
  return (
    <div
      className={`${className} max-md:w-full w-[calc((100%/3)-11px)] flex flex-col `}
    >
      {children}
    </div>
  );
};
const TransfersFiltersItem = ({
  name,
  value,
  placeholder,
  min,
  type,
  typeItem,
  onChange,
  className,
  onKeyDown,
}: TTransfersFiltersItem) => {
  return (
    <>
      {typeItem === "select" ? (
        <select
          className={`border w-full border-primary  focus:outline-none focus:shadow-md focus-visible:shadow-md h-[40px]  px-2 rounded cursor-pointer text-primary text-sm font-family-base ${
            className ? className : ""
          }`}
          name={name}
          value={value}
          onChange={onChange}
        >
          <option value="">Todos os Tipos</option>
          <option value="Câmbio e Moedas">Câmbio e Moedas</option>
          <option value="DOC/TED">DOC/TED</option>
          <option value="Empréstimo e Financiamento">
            Empréstimo e Financiamento
          </option>
        </select>
      ) : typeItem === "input" ? (
        <input
          type={type}
          name={name}
          min={min}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`border border-primary w-full  focus:outline-none focus:shadow-md focus-visible:shadow-md  h-[40px]  px-2 rounded cursor-pointer text-primary text-sm font-family-base ${
            className ? className : ""
          }`}
          onKeyDown={onKeyDown}
        />
      ) : typeItem === "currency" ? (
        <CurrencyInput
          name={name}
          placeholder={placeholder}
          value={value}
          decimalsLimit={2}
          decimalSeparator=","
          groupSeparator="."
          intlConfig={{ locale: "pt-BR", currency: "BRL" }}
          onValueChange={(value) => {
            const customEvent = {
              target: {
                name,
                value: value || "",
              },
            } as React.ChangeEvent<HTMLInputElement>;
            onChange(customEvent);
          }}
          className={`border border-primary w-full  focus:outline-none focus:shadow-md focus-visible:shadow-md h-[40px] px-2 rounded cursor-pointer text-primary text-sm font-family-base ${
            className || ""
          }`}
        />
      ) : null}
    </>
  );
};

const TransfersFiltersLabels = ({
  text,
  className,
  style,
}: TTransfersFiltersLabels) => {
  return (
    <label
      className={`text-primary text-sm font-bold font-family-base mb-1 ${
        className ? className : ""
      }`}
      style={style}
    >
      {text}
    </label>
  );
};

const TransfersFilters = ({
  filters,
  onChange,
  onResetFilters,
  error,
  onKeyDown,
}: TTransfersFilters) => {
  const [filterDisabledButtonReset, setFilterDisabledButtonReset] =
    useState(true);
  useEffect(() => {
    if (
      filters.typeTransaction !== "" ||
      filters.minimumValue !== "" ||
      filters.maximumValue !== "" ||
      filters.startDate !== "" ||
      filters.endDate !== ""
    ) {
      setFilterDisabledButtonReset(false);
    }
  }, [filters]);

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <TransfersFiltersItemContainer>
        <TransfersFiltersLabels text="Tipo de Transação" />
        <TransfersFiltersItem
          type="select"
          name="typeTransaction"
          value={filters.typeTransaction}
          onChange={onChange}
          typeItem={"select"}
        />
      </TransfersFiltersItemContainer>

      <TransfersFiltersItemContainer>
        <TransfersFiltersLabels text="Valor mínimo da transação" />
        <TransfersFiltersItem
          type="number"
          name="minimumValue"
          min={0}
          placeholder="Valor mínimo"
          value={filters.minimumValue}
          onChange={onChange}
          onKeyDown={onKeyDown}
          typeItem={"currency"}
        />
      </TransfersFiltersItemContainer>

      <TransfersFiltersItemContainer>
        <TransfersFiltersLabels text="Valor máximo da transação" />
        <TransfersFiltersItem
          type="number"
          min={0}
          name="maximumValue"
          placeholder="Valor máximo"
          value={filters.maximumValue}
          onChange={onChange}
          onKeyDown={onKeyDown}
          typeItem={"currency"}
        />
      </TransfersFiltersItemContainer>

      <TransfersFiltersItemContainer className="gap-0 max-md:w-[100%!important]  w-[calc(((100%/3)*2)-5px)!important]">
        <TransfersFiltersLabels
          text="Busque a transação por data"
          className="mb-0"
        />
        <div className="flex gap-4 w-full">
          <div className="w-1/2">
            <TransfersFiltersLabels
              text="De:"
              style={{ fontWeight: "normal" }}
            />
            <TransfersFiltersItem
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={onChange}
              typeItem={"input"}
            />
          </div>
          <div className="w-1/2">
            <TransfersFiltersLabels
              text="Até:"
              style={{ fontWeight: "normal" }}
            />
            <TransfersFiltersItem
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={onChange}
              typeItem={"input"}
            />
          </div>
        </div>
      </TransfersFiltersItemContainer>

      <TransfersFiltersItemContainer className="mt-auto">
        <Button
          label="Reiniciar Filtros"
          type="button"
          onClick={() => {
            onResetFilters();
            setFilterDisabledButtonReset(true);
          }}
          style={{ minWidth: "0", height: "40px", borderRadius: "4px" }}
          disabled={filterDisabledButtonReset}
        />
      </TransfersFiltersItemContainer>

      {error && (
        <p className="text-error w-full font-family-base text-sm font-semibold mt-2.5">
          {error}
        </p>
      )}
    </div>
  );
};

export {
  TransfersFilters,
  TransfersFiltersItem,
  TransfersFiltersLabels,
  TransfersFiltersItemContainer,
};
