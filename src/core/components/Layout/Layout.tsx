import React from "react";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Header } from "./Header";

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <>
      <Header />
      <div className="container mx-auto p-8">
        <Outlet />
      </div>
    </>
  );
};

interface LayoutProps {
  [key: string]: any;
}

export default Layout;
