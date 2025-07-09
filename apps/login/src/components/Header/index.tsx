import React from "react";
import byteBankLogo from "./../../assets/logo-bytebank.svg";
import byteBankLogoTablet from "./../../assets/logo-bytebank-tablet.svg";
import closeIcon from "./../../assets/close-icon.svg";
import hamburgerMenuIcon from "./../../assets/hamburger-menu-icon.svg";
import Button from "../Button";
import { TMenuLinksItems, TMenuMobile } from "../../types/TMenu";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";

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

const LinkItem = ({ text, href, isBlank, className }: TMenuLinksItems) => {
  return (
    <a
      href={href}
      title={text}
      target={isBlank ? "_blank" : "_self"}
      className={`text-link text-md font-family-base font-bold transition-all hover:underline ${
        className ? className : ""
      }`}
    >
      {text}
    </a>
  );
};

const MenuMobile = ({ className }: TMenuMobile) => {
  return (
    <div
      className={`max-md:block hidden text-white ${className ? className : ""}`}
    >
      <Disclosure as="nav" className="md:hidden flex items-center">
        {({ open, close }) => (
          <>
            <DisclosureButton className="text-gray-700 hover:text-black focus:outline-none">
              {open ? (
                ""
              ) : (
                <img
                  width={30}
                  height={30}
                  src={hamburgerMenuIcon}
                  alt={"Abrir Menu"}
                />
              )}
            </DisclosureButton>
            <div
              className={`transition-all duration-500 fixed w-full top-0 h-screen z-30 bg-[#E4EDE3] p-4 ${
                open ? "right-0" : "right-[100%]"
              }`}
            >
              <DisclosurePanel className="flex flex-col px-4 pb-4 space-y-2 items-end mt-4">
                <DisclosureButton className="text-gray-700 hover:text-black focus:outline-none">
                  {open ? (
                    <img
                      width={24}
                      height={24}
                      src={closeIcon}
                      alt={"Fechar Menu"}
                    />
                  ) : (
                    ""
                  )}
                </DisclosureButton>
                <div className="flex flex-col items-center justify-center w-full mt-6">
                  <button
                    onClick={() => close()}
                    className="text-white"
                    type="button"
                  >
                    <img src={closeIcon} alt={"Fechar Menu"} />
                  </button>
                  <nav className="space-y-4 text-white">
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
              </DisclosurePanel>
            </div>
          </>
        )}
      </Disclosure>
    </div>
  );
};

const Header: React.FC = () => {
  return (
    <header className="bg-black  px-10 py-4 fixed w-full">
      <div className="container max-w-290 m-auto flex justify-between items-center">
        <div className="flex items-center space-x-4 ">
          <MenuMobile />
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
              className="h-6 max-lg:hidden max-md:block"
            />
            <img
              src={byteBankLogoTablet}
              alt="Bytebank"
              className="h-6 max-lg:block hidden max-md:hidden"
            />
          </div>
          <nav className="space-x-6 text-green-500 max-md:hidden">
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
        <div className="space-x-4 max-md:hidden">
          <Button text="Abrir minha conta" />
          <Button text="Já tenho conta" typeButton="outline" />
        </div>
      </div>
    </header>
  );
};

export { Header, LinkItem, MenuMobile};
