import React, { useState } from "react";

import { TMenuMobile } from "../../../../types/generic/TMenu";

import { default as store } from "../../../../store/login";

import useUserInfo from "../../../../hooks/useUserInfos";
import { UserInfo } from "../../../../interfaces/login/IUser";

import { logout } from "../../../../services/UserProfile/userService";
import { logoutRequest } from "../../../../features/login/slice";
// import { MenulinksItems } from "../../../login/header/menuItems";

import byteBankLogo from "./../../../../assets/svg/logo-bytebank.svg";
import closeIcon from "./../../../../assets/svg/close-icon.svg";
import hamburgerMenuIcon from "./../../../../assets/svg/hamburger-menu-icon.svg";
import illustrationRegisterModal from "./../../../../assets/svg/ilustration-register-modal.svg";
import illustrationLoginModal from "./../../../../assets/svg/ilustration-login-modal.svg";

import CustomLinkMenu from "../customLink";
import MenuLogado from "../logado";
import ActionButtonsMenu from "../actionButtons";
import CustomModal from "../../customModal";
import { cn } from "../../../../utils/utils";

// TODO: usar props
const MenuMobile = ({
  className,
  menuLinksItems,
  useAuth,
  variant,menuLinksItemsLogado,
}: TMenuMobile) => {
  const userInfo = useAuth;
  const [user, setUser] = useState<UserInfo>(userInfo);
  const [authenticated, setAuthenticated] = useState<boolean>(
    userInfo.email !== undefined && userInfo.email !== ""
  );
  const [open, setOpen] = useState(false);
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [openModalRegister, setOpenModalRegister] = useState(false);
  const [openModalLogoutConfirmation, setOpenModalLogoutConfirmation] =
    useState(false);
  const [registered, setRegistered] = useState(false);

  store.subscribe(() => {
    const state = store.getState()["userInfo"];
    setUser(state);
    setAuthenticated(state.isAuthenticated);
  });

  const handleClose = () => {
    const contentMenuMobile = document.querySelector(".menu-mobile-wrapper");
    contentMenuMobile?.classList.add("animate-ui-slide-out-left");
    const openMenuMobileWrapper = document.querySelector(
      ".open-menu-mobile-wrapper"
    );
    openMenuMobileWrapper?.classList.add("animate-ui-slide-in-top");
    setTimeout(() => {
      setOpen(false);
    }, 400);
  };
  const handleOpen = () => {
    const contentMenuMobile = document.querySelector(".menu-mobile-wrapper");
    contentMenuMobile?.classList.remove("animate-ui-slide-out-left");
    const openMenuMobileWrapper = document.querySelector(
      ".open-menu-mobile-wrapper"
    );
    openMenuMobileWrapper?.classList.remove("animate-ui-slide-in-top");

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

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("token_expiration");
    store.dispatch(logoutRequest());
    logout();
  };

  const handleOpenLogoutConfirmationModal = () => {
    setOpenModalLogoutConfirmation(true);
  };

  return (
    <>
      <div
        className={`flex items-center  justify-between space-x-4 w-full menu-mobile ${
          className ? className : ""
        }`}
      >
        <div className="w-full">
          <div
            className={`open-menu-mobile-wrapper ${
              open
                ? "hidden"
                : "flex justify-between w-full items-center animate-ui-slide-in-top"
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
                className={cn(`cursor-pointer filter-(--filter-ui-primary-2)`, variant === "dashboard" ? "filter-(--filter-ui-white)" : variant === "login" ? "filter-(--filter-ui-primary-2)" : "")}
              />
            </button>
            <div className="relative">
              <CustomLinkMenu
                text="Inicio"
                href="/"
                isBlank={false}
                className="text-ui-zero cursor-pointer absolute top-0 left-0 right-0 bottom-0 m-auto z-[1] w-full h-full block"
              />
              <img src={byteBankLogo} alt="Bytebank" className={cn(`h-6`, variant === "dashboard" ? "filter-(--filter-ui-white)" : variant === "login" ? "filter-(--filter-ui-primary-2)" : "")} />
            </div>
          </div>

          <div
            className={cn(`menu-mobile-wrapper min-h-screen w-full  fixed top-0 left-0  bg-black`,  open ? "animate-ui-slide-in-left block" : "animate-ui-slide-out-left hidden", variant === "dashboard" ? "bg-ui-primary" :variant ==="login" ?"bg-black" :"" )}
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
                  className={cn(`w-4 h-4`, variant === "dashboard" ? "filter-(--filter-ui-white)" : variant === "login" ? "filter-(--filter-ui-primary-2)" : "")}
                />
              </button>
              <div className="flex flex-col justify-between h-full gap-4 w-full mt-4">
                <nav className="space-x-6 flex flex-col gap-4 w-full">
                  {authenticated && (
                    <MenuLogado variant={variant} menuLinksItemsLogado={menuLinksItemsLogado}
                      onClick={() => {
                        handleOpenLogoutConfirmationModal();
                        handleClose();
                      }}
                      name={user.name}
                    />
                  )}
                  {menuLinksItems.map((link) => (
                    <CustomLinkMenu
                      className="border-b border-white pb-3 w-full m-0 text-white"
                      key={link.text}
                      text={link.text}
                      href={link.href}
                      isBlank={link.isBlank}
                      onClick={handleClose}
                    />
                  ))}
                </nav>
                {!authenticated  && variant === "login" &&  (
                  <ActionButtonsMenu
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

          {!authenticated  && variant === "login" &&  (
            <>
              <CustomModal
                id="login-modal"
                title="Login"
                open={openModalLogin}
                setOpen={setOpenModalLogin}
                variant={"login"}
                pathImage={illustrationLoginModal}
              />
              <CustomModal
                id="register-modal"
                title="Cadastre-se"
                descripption="Preencha os campos abaixo para criar sua conta corrente!"
                pathImage={illustrationRegisterModal}
                open={openModalRegister}
                setOpen={setOpenModalRegister}
                variant={"register"}
              />
            </>
          )}

          {authenticated && (
            <CustomModal
              id="logout-modal"
              title="Ao sair, você precisará fazer login novamente. Deseja continuar?"
              open={openModalLogoutConfirmation}
              setOpen={setOpenModalLogoutConfirmation}
              variant={"logout"}
              onClickLogout={handleLogout}
            />
          )}
          {registered  && variant === "login" &&  (
            <CustomModal
              id="logout-modal"
              title="Parabéns!!! Conta criada com sucesso!"
              open={registered}
              setOpen={setRegistered}
              variant={"message"}
              onClickLogout={handleLogout}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MenuMobile;
