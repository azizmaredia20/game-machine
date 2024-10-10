import React from "react";
import { Outlet } from "react-router-dom";

import { Header } from "./Header";
import SelectStore from "./SelectStore";


const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <>
      <Header />
      <SelectStore />
      <Outlet />
    </>
  );
};

interface LayoutProps {
  [key: string]: any;
}

export default Layout;
