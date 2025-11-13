import React, { useState } from "react";
import MenuDesktop from "../../../components/generic/menu/desktop";
import MenuMobile from "../../../components/generic/menu/mobile";

const HeaderLogin: React.FC = () => {
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

export default HeaderLogin;
