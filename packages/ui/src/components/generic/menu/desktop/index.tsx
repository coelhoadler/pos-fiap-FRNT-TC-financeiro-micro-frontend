import React, { useState } from "react";
import { TMenuDesktop } from "../../../../types/generic/TMenu";

import CustomLinkMenu from "../customLink";
import ActionButtonsMenu from "../actionButtons";
import CustomModal from "../../customModal";
import MenuLogado from "../logado";

import { default as store } from "../../../../store/login";

import { UserInfo } from "../../../../interfaces/login/IUser";

import { logout } from "../../../../services/UserProfile/userService";
import { logoutRequest } from "../../../../features/login/slice";

import byteBankLogo from "./../../../../assets/svg/logo-bytebank.svg";
import byteBankLogoTablet from "./../../../../assets/svg/logo-bytebank-tablet.svg";
import illustrationRegisterModal from "./../../../../assets/svg/ilustration-register-modal.svg";
import illustrationLoginModal from "./../../../../assets/svg/ilustration-login-modal.svg";
import { cn } from "../../../../utils/utils";

const MenuDesktop = ({
  className,
  useAuth,
  menuLinksItems,
  variant,
  menuLinksItemsLogado,
}: TMenuDesktop) => {
  const userInfo = useAuth; // talvez receber por paramentro
  const [user, setUser] = useState<UserInfo>(userInfo);
  const [authenticated, setAuthenticated] = useState<boolean>(
    userInfo.email !== undefined && userInfo.email !== ""
  );
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

  const handleOpenLoginModal = () => {
    setOpenModalLogin(true);
  };

  const handleOpenRegisterModal = () => {
    setOpenModalRegister(true);
  };

  const handleLogout = async () => {
    logout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("token_expiration");
    store.dispatch(logoutRequest());
  };

  const handleOpenLogoutConfirmationModal = () => {
    setOpenModalLogoutConfirmation(true);
  };

  return (
    <div
      className={cn(
        `container max-w-290 m-auto flex justify-between items-center`,
        variant === "dashboard" ? "justify-end" : "",
        className
      )}
    >
      {variant === "login" && (
        <div className="flex items-center space-x-4 ">
          <div className="relative">
            <CustomLinkMenu
              text="Inicio"
              href="/"
              isBlank={false}
              className="text-ui-zero cursor-pointer absolute top-0 left-0 right-0 bottom-0 m-auto z-[1] w-full h-full block"
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
          <nav className="space-x-6 text-ui-primary-2">
            {menuLinksItems && (
              <>
                {menuLinksItems.map((item) => (
                  <CustomLinkMenu
                    key={item.text}
                    text={item.text}
                    href={item.href}
                    isBlank={item.isBlank}
                  />
                ))}
              </>
            )}
          </nav>
        </div>
      )}

      {authenticated ? (
        <MenuLogado
          menuLinksItemsLogado={menuLinksItemsLogado}
          variant={variant}
          onClick={handleOpenLogoutConfirmationModal}
          name={user.name}
        />
      ) : variant === "login" ? (
        <>
          <div className="space-x-4">
            <ActionButtonsMenu
              onClickLogin={handleOpenLoginModal}
              onClickRegister={handleOpenRegisterModal}
            />
          </div>
        </>
      ) : (
        ""
      )}
      {!authenticated && variant === "login" && (
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
      {registered && variant === "login" && (
        <CustomModal
          id="logout-modal"
          title="Parabéns!!! &#127881; Conta criada com sucesso!"
          open={registered}
          setOpen={setRegistered}
          variant={"message"}
          onClickLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default MenuDesktop;
