import React from "react";
import byteBankIconWhite from "./../../../assets/svg/icon-bytebank-white.svg";
import { TFooter } from "../../../types/generic/TFooter";
import MenuTitle from "./menuTitle";
import MenuItems from "./menuItems";
import SocialMedia from "../../generic/socialMedia";
import { cn } from "../../../utils/utils";
import { contactFooter, servicesFooter, socialMedia } from "./menuItems/items";

export const Footer = ({ className, id }: TFooter) => {
  return (
    <footer
      className={cn(`bg-black text-white px-10 py-10 `, className)}
      id={id}
    >
      <div className="container max-w-290 m-auto flex justify-between items-center max-md:flex-col max-md:gap-7">
        <div className="max-md:w-full max-md:flex max-md:flex-col max-md:items-center">
          <MenuTitle text="Serviços" />
          <ul className="space-y-1">
            {servicesFooter.map((item) => (
              <MenuItems text={item.text} />
            ))}
          </ul>
        </div>
        <div className="max-md:w-full max-md:flex max-md:flex-col max-md:items-center">
          <MenuTitle text="Contato" />
          <ul className="space-y-1">
            {contactFooter.map((item) => (
              <MenuItems text={item.text} link={item.link} />
            ))}
          </ul>
        </div>
        <div className="max-md:w-full max-md:flex max-md:flex-col max-md:items-center">
          <MenuTitle text="Desenvolvido por Equipe" />
          <img
            src={byteBankIconWhite}
            alt="Bytebank"
            className="h-5 mb-2 mt-3 "
          />
          <div className="mt-4 flex space-x-4 ">
            {socialMedia.map((item) => (
              <SocialMedia
                text={item.text}
                href={item.link}
                image={item.image}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
