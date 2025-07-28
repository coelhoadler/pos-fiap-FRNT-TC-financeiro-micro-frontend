import profileIcon from "../../assets/svg/profile-icon.svg";
import byteBankIconWhite from "../../assets/svg/icon-bytebank-white.svg";
import arrowDown from "../../assets/svg/arrow-down.svg";
import { MobileMenu } from "../MobileMenu";
import { useState } from "react";
import { userLogout } from "../../services/UserProfile/apiEndpoints";

export type THeader = {
  nameUser: string;
  isLoggedIn?: boolean;
};

const Header = ({ nameUser, isLoggedIn }: THeader) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const handleOpenDropDown = () => {
    setOpenDropDown((state) => !state);
  };

  const handleLogout = async () => {
    userLogout();
  };
  
  return (
    <header className="flex justify-between items-center bg-primary h-[96px] p-1.5 fixed w-full z-30 shadow-[0px_2px_10px_1px_rgba(0,0,0,0.75)]">
      <div className="max-w-[80%] m-auto w-full max-lg:max-w-full px-[15px] max-md:flex max-md:items-center">
        {isLoggedIn && <MobileMenu />}
        <div
          className={`flex items-center gap-5 w-full ${
            isLoggedIn ? "justify-end" : "justify-center"
          }`}
        >
          {isLoggedIn && (
            <div className="relative flex items-center gap-3">
              <a
                className="absolute inset-0 z-10 top-0 bottom-0 left-0 right-0 m-auto block w-full h-full"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleOpenDropDown();
                }}
              ></a>
              <img width={30} height={30} src={profileIcon} alt="Minha conta" />
              <p className="font-bold text-md font-family-base block text-white">
                {nameUser}
              </p>
              <img
                src={arrowDown}
                className={` w-3 h-3 transition-transform filter-(--filter-white) ${
                  openDropDown ? "rotate-180" : "rotate-0"
                }`}
                alt="Seta"
              />

              <div
                className={`absolute right-0 top-[50px] bg-white shadow-lg transition-all rounded-md p-2 w-full ${
                  openDropDown
                    ? "animate-slide-in-top-soft z-[1]"
                    : "animate-slide-out-top-soft z-[-999999] hidden"
                }`}
              >
                <ul>
                  <li>
                    <a
                      className="rounded-md py-1 px-2 font-bold text-sm font-family-base block transition-all text-primary hover:bg-gray-100"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLogout();
                      }}
                    >
                      Sair
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {!isLoggedIn && (
            <div className="relative">
              <img
                src={byteBankIconWhite}
                alt="Bytebank"
                className="h-10 mb-2 mt-3 "
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
