import React from "react";
import { TMenuTitle } from "../../../../types/generic/TFooter";
import { cn } from "../../../../utils/utils";

const MenuTitle = ({ text, className }: TMenuTitle) => {
  return (
    <h4 className={cn(`font-bold font-family-ui-base text-ui-md mb-2 text-white max-md:text-center`,className)}>
      {text}
    </h4>
  );
};

export default MenuTitle;
