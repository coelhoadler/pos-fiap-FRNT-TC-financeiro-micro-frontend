import React from "react";
import SideBarMenuDesktop from "../../generic/sidebarMenu";
import { sideBarMenuItems } from "./sidebarMenuItems";

const SideBarMenuDashboard = () => {
  return <SideBarMenuDesktop menuLinksItems={sideBarMenuItems} />;
};

export default SideBarMenuDashboard;
