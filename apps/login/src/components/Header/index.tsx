import React, { useEffect, useState } from "react";
import byteBankLogo from "./../../assets/logo-bytebank.svg";
import byteBankLogoTablet from "./../../assets/logo-bytebank-tablet.svg";
import userIcon from "./../../assets/user-icon.svg";
import arrowDown from "./../../assets/arrow-down.svg";
import closeIcon from "./../../assets/close-icon.svg";
import hamburgerMenuIcon from "./../../assets/hamburger-menu-icon.svg";
import illustrationRegisterModal from "./../../assets/ilustration-register-modal.svg";
import illustrationLoginModal from "./../../assets/ilustration-login-modal.svg";
import Button from "../Button";
import {
  TMenuLinksItems,
  TMenuMobile,
  TMenuDesktop,
  TCtaItems,
  TMenuLogado,
} from "../../types/TMenu";
import { CustomModal } from "../CustomModal";

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

const CtaItems = ({ onClickLogin, onClickRegister, className }: TCtaItems) => {
  return (
    <div
      className={`flex items-center gap-4 max-md:flex-col max-md:w-full max-md:mt-8 ${
        className ? className : ""
      }`}
    >
      <Button
        className="max-md:w-full"
        text="Abrir minha conta"
        typeButton="button"
        onClick={onClickLogin}
      />
      <Button
        className="max-md:w-full"
        text="Já tenho conta"
        styleButton="outline"
        typeButton="button"
        onClick={onClickRegister}
      />
    </div>
  );
};

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

const MenuLogado = ({ className }: TMenuLogado) => {
  const [name, setName] = useState("");
  const [openDropDown, setOpenDropDown] = useState(false);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      setName(user.name);
    }
  }, []);

  const handleOpenDropDown = () => {
    setOpenDropDown((state) => !state);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className={`max-md:w-full ${className ? className : ""}`}>
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
            className="w-4 h-4 object-center object-contain filter-(--filter-link)"
            alt=""
          />
          <p className="text-link capitalize text-md font-family-base font-bold">
            {name || "Carregando..."}
          </p>
          <img
            src={arrowDown}
            className={`w-3 h-3 object-center object-contain filter-(--filter-link) mt-[3px] mx-auto max-md:mx-0 transition-transform ${
              openDropDown ? "rotate-180" : "rotate-0"
            }`}
            alt="Seta"
          />
        </a>

        <div
          className={`flex flex-col max-md:p-0 max-md:mt-2 gap-3 max-md:top-0 max-md:relative bg-black rounded-[5px] px-4 py-3 absolute left-0 top-[40px] w-full transition-all ${
            openDropDown
              ? "animate-slide-in-top-soft z-[1]"
              : "animate-slide-out-top-soft z-[-9999999999] hidden"
          }`}
        >
          <LinkItem
            className="text-link max-md:font-bold font-normal text-sm max-md:pb-2 max-md:border-b max-md:border-b-white"
            text="Dashboard"
            href="/dashboard"
          />
          <LinkItem
            className="text-link max-md:font-bold font-normal text-sm max-md:pb-2 max-md:border-b max-md:border-b-white"
            text="Sair"
            href="/"
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

const MenuMobile = ({ className }: TMenuMobile) => {
  const [open, setOpen] = useState(false);
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [openModalRegister, setOpenModalRegister] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleClose = () => {
    const contentMenuMobile = document.querySelector(".menu-mobile-wrapper");
    contentMenuMobile?.classList.add("animate-slide-out-left");
    const openMenuMobileWrapper = document.querySelector(
      ".open-menu-mobile-wrapper"
    );
    openMenuMobileWrapper?.classList.add("animate-slide-in-top");
    setTimeout(() => {
      setOpen(false);
    }, 400);
  };
  const handleOpen = () => {
    const contentMenuMobile = document.querySelector(".menu-mobile-wrapper");
    contentMenuMobile?.classList.remove("animate-slide-out-left");
    const openMenuMobileWrapper = document.querySelector(
      ".open-menu-mobile-wrapper"
    );
    openMenuMobileWrapper?.classList.remove("animate-slide-in-top");

    setOpen(true);
  };

  const handleOpenLoginModal = () => {
    setTimeout(() => {
      setOpenModalLogin(true);
    }, 500);
  };
  const handleOpenRegisterModal = () => {
    setTimeout(() => {
      setOpenModalRegister(true);
    }, 500);
  };

  const handleCloseLoginModal = () => {
    const modalContainer = document.querySelector(
      ".menu-mobile #login-modal .modal-container"
    );
    modalContainer?.classList.add("animate-scaleOut");
    setTimeout(() => {
      setOpenModalLogin(false);
    }, 210);
  };
  const handleCloseRegisterModal = () => {
    const modalContainer = document.querySelector(
      ".menu-mobile #register-modal .modal-container"
    );
    modalContainer.classList.add("animate-scaleOut");
    console.log("mobile", modalContainer);
    setTimeout(() => {
      setOpenModalRegister(false);
    }, 210);
  };

  return (
    <>
      <div
        className={`flex items-center justify-between space-x-4 w-full menu-mobile ${
          className ? className : ""
        }`}
      >
        <div className="w-full">
          <div
            className={`open-menu-mobile-wrapper ${
              open
                ? "hidden"
                : "flex justify-between w-full items-center animate-slide-in-top"
            }`}
          >
            <button
              type="button"
              onClick={handleOpen}
              className="focus:outline-none focus:border-none focus:shadow-none"
            >
              <img
                src={hamburgerMenuIcon}
                alt="Menu"
                className="cursor-pointer filter-(--filter-link)"
              />
            </button>
            <div className="relative">
              <LinkItem
                text="Inicio"
                href="/"
                isBlank={false}
                className="text-zero cursor-pointer absolute top-0 left-0 right-0 bottom-0 m-auto z-[1] w-full h-full block"
              />
              <img src={byteBankLogo} alt="Bytebank" className="h-6" />
            </div>
          </div>

          <div
            className={` menu-mobile-wrapper min-h-screen w-full  fixed top-0 left-0  bg-black ${
              open
                ? "animate-slide-in-left block"
                : "animate-slide-out-left hidden"
            }`}
          >
            <div className="container max-w-full pt-10 px-10 m-auto">
              <button
                type="button"
                onClick={handleClose}
                className="w-fit absolute top-3 right-10 flex justify-end items-center my-3.5 focus:outline-none focus:border-none focus:shadow-none"
              >
                <img
                  src={closeIcon}
                  alt="Fechar menu"
                  className="filter-(--filter-link) w-4 h-4"
                />
              </button>
              <div className="flex flex-col justify-between h-full gap-4 w-full mt-4">
                <nav className="space-x-6 text-green-500 flex flex-col gap-4 w-full">
                  {isLoggedIn && <MenuLogado />}
                  {MenulinksItems.map((link) => (
                    <LinkItem
                      className="border-b border-white pb-3 w-full m-0"
                      key={link.text}
                      text={link.text}
                      href={link.href}
                      isBlank={link.isBlank}
                      onClick={handleClose}
                    />
                  ))}
                </nav>
                {!isLoggedIn && (
                  <CtaItems
                    onClickLogin={() => {
                      handleClose();
                      handleOpenLoginModal();
                    }}
                    onClickRegister={() => {
                      handleOpenRegisterModal();
                      handleClose();
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {!isLoggedIn && (
            <>
              <CustomModal
                id="login-modal"
                title="Login"
                isOpen={openModalLogin}
                onClose={handleCloseLoginModal}
                typeForm={"login"}
                pathImage={illustrationLoginModal}
              />
              <CustomModal
                id="register-modal"
                title="Cadastre-se"
                descripption="Preencha os campos abaixo para criar sua conta corrente!"
                pathImage={illustrationRegisterModal}
                isOpen={openModalRegister}
                onClose={handleCloseRegisterModal}
                typeForm={"register"}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

const MenuDesktop = ({ className }: TMenuDesktop) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [openModalRegister, setOpenModalRegister] = useState(false);
  const handleOpenLoginModal = () => {
    setOpenModalLogin(true);
  };
  const handleOpenRegisterModal = () => {
    setOpenModalRegister(true);
  };
  const handleCloseLoginModal = () => {
    const modalContainer = document.querySelector(
      "#login-modal .modal-container"
    );
    modalContainer?.classList.add("animate-scaleOut");
    setTimeout(() => {
      setOpenModalLogin(false);
    }, 210);
  };
  const handleCloseRegisterModal = () => {
    const modalContainer = document.querySelector(
      "#register-modal .modal-container"
    );
    modalContainer?.classList.add("animate-scaleOut");
    setTimeout(() => {
      setOpenModalRegister(false);
    }, 210);
  };
  return (
    <div
      className={`container max-w-290 m-auto flex justify-between items-center ${
        className ? className : ""
      }`}
    >
      <div className="flex items-center space-x-4 ">
        <div className="relative">
          <LinkItem
            text="Inicio"
            href="/"
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

      {isLoggedIn ? (
        <>
          <MenuLogado />
        </>
      ) : (
        <div className="space-x-4">
          <CtaItems
            onClickLogin={handleOpenLoginModal}
            onClickRegister={handleOpenRegisterModal}
          />
        </div>
      )}
      {!isLoggedIn && (
        <>
          <CustomModal
            id="login-modal"
            title="Login"
            isOpen={openModalLogin}
            onClose={handleCloseLoginModal}
            typeForm={"login"}
            pathImage={illustrationLoginModal}
          />
          <CustomModal
            id="register-modal"
            title="Cadastre-se"
            descripption="Preencha os campos abaixo para criar sua conta corrente!"
            pathImage={illustrationRegisterModal}
            isOpen={openModalRegister}
            onClose={handleCloseRegisterModal}
            typeForm={"register"}
          />
        </>
      )}
    </div>
  );
};

const Header: React.FC = () => {
  return (
    <header className="bg-black min-h-[80px] max-md:min-h-[56px] flex items-center px-10 fixed w-full z-10">
      <div className="max-md:hidden w-full">
        <MenuDesktop />
      </div>
      <div className="max-md:block hidden w-full">
        <MenuMobile />
      </div>
    </header>
  );
};

export { Header, LinkItem, MenuMobile, MenuDesktop, CtaItems, MenuLogado };
