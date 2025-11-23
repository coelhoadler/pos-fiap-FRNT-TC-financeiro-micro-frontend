import React, { useState } from "react";
import { cn } from "../../../utils/utils";
import { TSideBarMenu } from "../../../types/generic/TSideBarMenu";

const SideBarMenuDesktop = ({ className, menuLinksItems }: TSideBarMenu) => {
  const [activeItem, setActiveItem] = useState<string>("Inicio");
  return (
    <div
      className={cn(
        `h-full p-0 bg-gray-200 rounded-lg w-full max-lg:bg-transparent lg:p-8 lg:shadow-md`,
        className
      )}
    >
      <div className="flex lg:flex-col items-center justify-center max-lg:gap-5 max-sm:justify-start max-sm:overflow-x-auto">
        {menuLinksItems.map((item, index) => (
          <a
            key={item.title}
            href={item.path}
            title={item.title}
            onClick={() => {
              setActiveItem(item.title);
            }}
            className={cn(
              `text-ui-primary text-base font-family-base max-lg:border-0 pb-2 max-lg:mb-0 transition-all border-b border-ui-primary mb-2 w-full text-center max-w-[100%] max-sm:pb-3 max-sm:mb-3 max-sm:min-w-fit`,
              activeItem === item.title ? "font-bold border-b-2 max-lg:border-b-2 max-lg:text-link max-lg:border-link max-sm:text-secondary" : "font-normal"
            )}
          >
            {item.title}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SideBarMenuDesktop;
