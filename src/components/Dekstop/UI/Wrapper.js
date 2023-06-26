import React from "react";
import { Outlet } from "react-router-dom";
import SimpleSnackBar from "../../../shared/components/SnackBar";
const Wrapper = () => {
  return (
    <div>
      <SimpleSnackBar />
      <Outlet />
    </div>
  );
};

export default Wrapper;
