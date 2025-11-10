import React from "react";
import { TMenuItems } from "../../../../types/generic/TFooter";
import { cn } from "../../../../utils/utils";

const MenuItems = ({ text, className, children, link }: TMenuItems) => {
  return (
    <li
      className={cn(
        `font-normal font-family-ui-base text-ui-sm mb-2 text-white max-md:text-center`,
        className
      )}
    >
      {link ? (
        <a className="underline transition-all hover:no-underline" href={link}>
          {text}
        </a>
      ) : (
        text || children
      )}
    </li>
  );
};

export default MenuItems;
