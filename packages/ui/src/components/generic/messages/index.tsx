import React from "react";
import { TMessage } from "../../../types/generic/TMessage";
import { cn } from "../../../utils/utils";

export const Message = ({ className, text, id, showMessage }: TMessage) => {
  return (
    <>
      {showMessage && (
        <p
          className={cn(` text-ui-sm font-family-ui-base font-normal text-ui-error text-center`, className ? className : "" )}
          id={id ? id : ""}
        >
          {text}
        </p>
      )}
    </>
  );
};
