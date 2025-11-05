import React from "react";
import { TButton } from "../../../types/generic/TButton";

export const Button = ({
  text,
  className,
  typeButton,
  variant = "primary",
  children,
  onClick,
}: TButton) => {
  return (
    <button
      type={
        typeButton === "button"
          ? "button"
          : typeButton === "submit"
          ? "submit"
          : "reset"
      }
      onClick={onClick}
      className={`
        font-family-base text-md px-4 py-2 rounded-lg font-semibold cursor-pointer transition-all  
        ${
          variant === "primary"
            ? "bg-ui-primary hover:bg-ui-primary-500 text-white"
            : variant === "primary-outline"
            ? "border border-ui-primary text-ui-primary hover:bg-ui-primary hover:text-white"
            : variant === "primary-2"
            ? "bg-ui-primary-2 hover:bg-ui-primary-2-500 text-white"
            : variant === "primary-2-outline"
            ? "border border-ui-primary-2 text-ui-primary-2 hover:bg-ui-primary-2 hover:text-white"
            : ""
        }  ${className ? className : ""}`}
    >
      {text || children}
    </button>
  );
};

export default Button;
