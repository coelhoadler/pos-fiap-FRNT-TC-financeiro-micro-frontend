import React from "react";
import { TCustomLinkMenu } from "../../../../types/generic/TMenu";
import { cn } from "../../../../utils/utils";

const CustomLinkMenu = ({
  text,
  href,
  isBlank,
  className,
  style,
  onClick,
}: TCustomLinkMenu) => {
  return (
    <a
      href={href}
      title={text}
      target={isBlank ? "_blank" : "_self"}
      className={cn(
        `text-ui-primary-2 text-ui-md font-family-ui-base font-bold transition-all hover:underline`,
        className
      )}
      style={style}
      onClick={onClick}
    >
      {text}
    </a>
  );
};

export default CustomLinkMenu;
