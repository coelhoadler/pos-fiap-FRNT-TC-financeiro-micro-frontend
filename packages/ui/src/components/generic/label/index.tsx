import React from "react";
import { TLabel } from "../../../types/generic/TLabel";
import { cn } from "../../../utils/utils";

export const Label = ({ className, htmlFor, text, required }: TLabel) => {
  return (
    <label
      className={cn(`font-semibold font-family-ui-base text-black text-ui-md ${className ? className : ""}`)}
      htmlFor={htmlFor ? htmlFor : ""}
    >
      {required && <span className="text-ui-error mr-0.5">*</span>}
      {text}
    </label>
  );
};
