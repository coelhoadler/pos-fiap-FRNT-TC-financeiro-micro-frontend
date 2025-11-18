import React from "react";
import MenuDesktop from "../../generic/menu/desktop";
import MenuMobile from "../../generic/menu/mobile";
import { DashboardMenuItems } from "./menuItems";
import useUserInfo from "../../../hooks/useUserInfos";

const Header = () => {
  const userInfo = useUserInfo();
  return (
    <header className="bg-ui-primary min-h-[80px] max-md:min-h-[56px] flex items-center px-10 fixed w-full z-50">
      <div className="max-md:hidden w-full">
        <MenuDesktop
          variant="dashboard"
          menuLinksItems={DashboardMenuItems}
          useAuth={userInfo}
        />
      </div>
      <div className="max-md:block hidden w-full">
        <MenuMobile
          variant="dashboard"
          menuLinksItems={DashboardMenuItems}
          useAuth={userInfo}
        />
      </div>
    </header>
  );
};

export default Header;
