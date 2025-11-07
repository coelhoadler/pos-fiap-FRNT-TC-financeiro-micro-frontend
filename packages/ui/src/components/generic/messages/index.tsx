import React from "react";
import { TMessage } from "../../../types/generic/TMessage";
import { cn } from "../../../utils/utils";

export const Message = ({ className, text, id, showMessage, variant = "info" }: TMessage) => {
  return (
    <>
      {showMessage && (
        <p
          className={cn(` text-ui-sm font-family-ui-base font-normal text- text-ui-primary`, variant === "error" ? "text-ui-error" : variant === "info" ? "text-ui-primary" : variant === "success" ? "text-ui-primary-2" : className ? className : "")}
          id={id ? id : ""}
        >
          {text}
        </p>
      )}
    </>
  );
};
