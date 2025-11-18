import React, { useState } from "react";

import { TMenuLogado } from "../../../../types/generic/TMenu";

import userIcon from "./../../../../assets/svg/user-icon.svg";
import arrowDown from "./../../../../assets/svg/arrow-down.svg";
import CustomLinkMenu from "../customLink";
import { cn } from "../../../../utils/utils";

// TODO: usar props
const MenuLogado = ({
  name,
  className,
  variant,
  menuLinksItemsLogado,
  onClick,
}: TMenuLogado) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const handleOpenDropDown = () => {
    setOpenDropDown((state) => !state);
  };

  return (
    <div className={`max-md:w-full menu-logado ${className ? className : ""}`}>
      <div className="relative">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleOpenDropDown();
          }}
          className={`flex items-center max-md:flex-wrap max-md:pb-2 max-md:border-b max-md:border-b-white gap-2 relative ${
            openDropDown ? "max-md:border-none max-md:pb-0" : ""
          }`}
        >
          <img
            src={userIcon}
            className={cn(
              `w-4 h-4 object-contain filter-(--filter-ui-primary-2)`,
              variant === "login"
                ? "filter-(--filter-ui-primary-2)"
                : variant === "dashboard"
                ? "filter-(--filter-ui-white)"
                : ""
            )}
            alt="Usuário"
          />
          <p
            className={cn(
              ` capitalize text-ui-md font-bold`,
              variant === "login"
                ? "text-ui-primary-2"
                : variant === "dashboard"
                ? "text-white"
                : ""
            )}
          >
            {name}
          </p>
          <img
            src={arrowDown}
            className={cn(
              `w-3 h-3 transition-transform filter-(--filter-ui-primary-2)`,
              openDropDown ? "rotate-180" : "rotate-0",
              variant === "login"
                ? "filter-(--filter-ui-primary-2)"
                : variant === "dashboard"
                ? "filter-(--filter-ui-white)"
                : ""
            )}
            alt="Seta"
          />
        </a>

        <div
          className={`flex flex-col bg-black rounded-[5px] px-4 py-3 absolute left-0 top-[40px] w-full transition-all min-w-40 max-lg:min-w-0 max-md:relative max-md:top-0 max-md:px-0 max-md:pb-0 ${
            openDropDown
              ? "animate-ui-slide-in-top-soft z-[1]"
              : "animate-ui-slide-out-top-soft z-[-999999] hidden"
          }`}
        >
          {variant === "login" && (
            <>
              {menuLinksItemsLogado?.map((item) => (
                <CustomLinkMenu
                  key={item.href}
                  className={cn(`text-ui-sm pb-3 mb-3 border-b border-white`)}
                  text={item.text}
                  href={item.href}
                />
              ))}
            </>
          )}
          <CustomLinkMenu
            className={cn(`text-ui-sm pb-3 mb-3 border-b border-white hover:no-underline no-underline max-md:mb-0`, variant === "dashboard" ? "text-white":"")}
            text="Sair"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setTimeout(() => {
                setOpenDropDown(false);
              }, 50);
              onClick?.(e);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MenuLogado;
