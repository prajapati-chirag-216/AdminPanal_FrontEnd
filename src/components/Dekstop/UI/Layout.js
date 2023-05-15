import { Outlet } from "react-router-dom";
import React from "react";
import MainNavigation from "../Header/MainNavigation";
import classes from "./Layout.module.css";
const Layout = (props) => {
  return (
    <div>
      <MainNavigation />
      <div className={classes["main-div"]}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
