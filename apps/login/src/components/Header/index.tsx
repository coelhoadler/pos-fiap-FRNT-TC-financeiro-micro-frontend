import React from "react";
import byteBankLogo from "./../../assets/logo-bytebank.svg";

const Header: React.FC = () => {
  return (
    <header className="bg-black  px-10 py-4 fixed w-full">
      <div className="container max-w-290 m-auto flex justify-between items-center">
        <div className="flex items-center space-x-4 ">
          <img
            src={byteBankLogo}
            alt="Bytebank"
            className="h-6 cursor-pointer"
            onClick={() => window.location.reload()}
          />
          <nav className="space-x-6 text-green-500">
            <a href="#" className="hover:underline">
              Sobre
            </a>
            <a href="#" className="hover:underline">
              Serviços
            </a>
          </nav>
        </div>
        <div className="space-x-4">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded cursor-pointer">
            Abrir minha conta
          </button>
          <button className="border border-green-500 text-green-500 hover:bg-green-600 hover:text-white px-4 py-2 rounded cursor-pointer">
            Já tenho conta
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
