import React, { useState } from "react";
import byteBankLogo from "./../../assets/logo-bytebank.svg";
import byteBankLogoTablet from "./../../assets/logo-bytebank-tablet.svg";
import closeIcon from "./../../assets/close-icon.svg";
import hamburgerMenuIcon from "./../../assets/hamburger-menu-icon.svg";
import Button from "../Button";
import { TMenuLinksItems, TMenuMobile, TMenuDesktop } from "../../types/TMenu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@radix-ui/react-dialog";

const MenulinksItems: TMenuLinksItems[] = [
  {
    text: "Sobre",
    href: "#sobre",
    isBlank: false,
  },
  {
    text: "Serviços",
    href: "#servicos",
    isBlank: false,
  },
];

const LinkItem = ({
  text,
  href,
  isBlank,
  className,
  onClick,
}: TMenuLinksItems) => {
  return (
    <a
      href={href}
      title={text}
      target={isBlank ? "_blank" : "_self"}
      className={`text-link text-md font-family-base font-bold transition-all hover:underline ${
        className ? className : ""
      }`}
      onClick={onClick ? () => onClick() : undefined}
    >
      {text}
    </a>
  );
};

const MenuMobile = ({ className }: TMenuMobile) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className={`flex items-center justify-between space-x-4 w-full ${
          className ? className : ""
        }`}
      >
        <Dialog open={open} onOpenChange={setOpen}>
          <div
            className={`${
              open ? "hidden" : "flex justify-between w-full items-center"
            }`}
          >
            <DialogTrigger asChild onClick={() => setOpen(true)}>
              <img
                src={hamburgerMenuIcon}
                alt="Menu"
                className="cursor-pointer filter-(--filter-link)"
              />
            </DialogTrigger>
            <div className="relative">
              <LinkItem
                text="Inicio"
                href="/login"
                isBlank={false}
                className="text-zero cursor-pointer absolute top-0 left-0 right-0 bottom-0 m-auto z-[1] w-full h-full block"
              />
              <img src={byteBankLogo} alt="Bytebank" className="h-6" />
            </div>
          </div>
          <DialogContent
            className={` min-h-screen w-full  fixed top-0 left-0  bg-black ${
              open ? "animate-in" : "animate-out"
            }`}
          >
            <div className="container max-w-full pt-5 px-10 m-auto">
              <DialogClose className="flex w-full justify-end items-center my-3.5 focus:outline-none focus:border-none focus:shadow-none">
                <img
                  src={closeIcon}
                  alt="Fechar menu"
                  className="filter-(--filter-link)"
                />
              </DialogClose>
              <div className="flex flex-col justify-between h-full gap-4 w-full mt-4">
                <nav className="space-x-6 text-green-500 flex flex-col gap-4 w-full">
                  {MenulinksItems.map((link) => (
                    <LinkItem
                      className="border-b border-white pb-3 w-full m-0"
                      key={link.text}
                      text={link.text}
                      href={link.href}
                      isBlank={link.isBlank}
                      onClick={() => setOpen(false)}
                    />
                  ))}
                </nav>
                <div className="flex flex-col gap-4 w-full mt-8">
                  <Button text="Abrir minha conta" className="w-full" onClick={() => setOpen(false)} />
                  <Button
                    text="Já tenho conta"
                    typeButton="outline"
                    className="w-full" onClick={() => setOpen(false)}
                  />
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

const MenuDesktop = ({ className }: TMenuDesktop) => {
  return (
    <div className="container max-w-290 m-auto flex justify-between items-center">
      <div className="flex items-center space-x-4 ">
        <div className="relative">
          <LinkItem
            text="Inicio"
            href="/login"
            isBlank={false}
            className="text-zero cursor-pointer absolute top-0 left-0 right-0 bottom-0 m-auto z-[1] w-full h-full block"
          />
          <img
            src={byteBankLogo}
            alt="Bytebank"
            className="h-6 max-lg:hidden"
          />
          <img
            src={byteBankLogoTablet}
            alt="Bytebank"
            className="h-6 max-lg:block hidden max-md:hidden"
          />
        </div>
        <nav className="space-x-6 text-green-500">
          {MenulinksItems.map((link) => (
            <LinkItem
              key={link.text}
              text={link.text}
              href={link.href}
              isBlank={link.isBlank}
            />
          ))}
        </nav>
      </div>
      <div className="space-x-4">
        <Button text="Abrir minha conta" />
        <Button text="Já tenho conta" typeButton="outline" />
      </div>
    </div>
  );
};

const Header: React.FC = () => {
  return (
    <header className="bg-black  px-10 py-4 fixed w-full z-10">
      <div className="max-md:hidden">
        <MenuDesktop />
      </div>
      <div className="max-md:block hidden">
        <MenuMobile />
      </div>
    </header>
  );
};

export { Header, LinkItem, MenuMobile, MenuDesktop };
