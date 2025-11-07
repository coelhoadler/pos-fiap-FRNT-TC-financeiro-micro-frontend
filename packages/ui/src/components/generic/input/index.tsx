import React from "react";
import { TInput } from "../../../types/generic/TInput";
import { cn } from "../../../utils/utils";

export const Input = ({
  className,
  placeholder,
  type,
  id,
  required,
  onChange,
  value,
  onClick,
  checked,
}: TInput) => {
  return (
    <>
      <input
        id={id}
        className={cn(
          `min-h-10 bg-white focus:border-black text-ui-md placeholder:font-normal focus:outline-none focus:shadow-none border-black/70 rounded-sm border py-0 px-2.5   font-family-ui-base font-medium text-black ${
            type === "checkbox"
              ? "w-6 h-6 border-black min-h-[24px!important] cursor-pointer appearance-none checked:bg-no-repeat checked:bg-position-[center_top_6px] checked:bg-size-[14px] checked:bg-[image:var(--bg-ui-check-black-icon)]"
              : ""
          } ${className ? className : ""}`
        )}
        value={value ? value : ""}
        placeholder={placeholder ? placeholder : ""}
        required={required}
        onChange={onChange}
        onClick={onClick}
        checked={checked}
        type={
          type === "password"
            ? "password"
            : type === "text"
            ? "text"
            : type === "submit"
            ? "submit"
            : type === "checkbox"
            ? "checkbox"
            : type === "radio"
            ? "radio"
            : type === "email"
            ? "email"
            : "text"
        }
      />
    </>
  );
};
