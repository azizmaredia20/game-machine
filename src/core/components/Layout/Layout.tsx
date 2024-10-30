import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import SelectStore from "./SelectStore";


const Layout: React.FC<LayoutProps> = ({ showSelectStore } = { showSelectStore: true }) => {
  return (
    <>
      <Header />
      { showSelectStore && <SelectStore /> }
      <Outlet />
    </>
  );
};

interface LayoutProps {
  showSelectStore?: boolean;
}

export default Layout;
