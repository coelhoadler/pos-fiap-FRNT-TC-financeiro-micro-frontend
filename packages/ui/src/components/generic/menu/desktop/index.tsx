import React, { useState } from "react";
import { TMenuDesktop } from "../../../../types/generic/TMenu";

import CustomLinkMenu from "../customLink";
import ActionButtonsMenu from "../actionButtons";
import CustomModal from "../../customModal";
import MenuLogado from "../logado";

import { default as store } from "../../../../store/login";

import useUserInfo from "../../../../hooks/useUserInfos";
import { UserInfo } from "../../../../interfaces/login/IUser";

import { logout } from "../../../../services/UserProfile/userService";
import { logoutRequest } from "../../../../features/login/slice";
import { MenulinksItems } from "../../../login/header/menuItems";

import byteBankLogo from './../../../../assets/svg/logo-bytebank.svg';
import byteBankLogoTablet from './../../../../assets/svg/logo-bytebank-tablet.svg';
import illustrationRegisterModal from './../../../../assets/svg/ilustration-register-modal.svg';
import illustrationLoginModal from './../../../../assets/svg/ilustration-login-modal.svg';
// TODO: usar props
const MenuDesktop = ({ className }: TMenuDesktop) => {
  const userInfo = useUserInfo(); // talvez receber por paramentro 
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
      className={`container max-w-290 m-auto flex justify-between items-center ${
        className ? className : ""
      }`}
    >
      <div className="flex items-center space-x-4 ">
        <div className="relative">
          <CustomLinkMenu
            text="Inicio"
            href="/"
            isBlank={false}
            className="text-[0px] cursor-pointer absolute top-0 left-0 right-0 bottom-0 m-auto z-[1] w-full h-full block"
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
          {MenulinksItems.map((link) => ( //receber por parametro
            <CustomLinkMenu
              key={link.text}
              text={link.text}
              href={link.href}
              isBlank={link.isBlank}
            />
          ))}
        </nav>
      </div>

      {authenticated ? (
        <MenuLogado
          onClick={handleOpenLogoutConfirmationModal}
          name={user.name}
        />
      ) : (
        <div className="space-x-4">
          <ActionButtonsMenu
            onClickLogin={handleOpenLoginModal}
            onClickRegister={handleOpenRegisterModal}
          />
        </div>
      )}
      {!authenticated && (
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
      {registered && (
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
