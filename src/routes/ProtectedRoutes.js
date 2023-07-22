import React from "react";
import { Navigate, Outlet, redirect, useLoaderData } from "react-router-dom";
import { fetchAdminProfile } from "../utils/api";
import { uiActions } from "../store/ui-slice";
import store from "../store";
import roleTypes from "../utils/roles/roleTypes";

const ProtectedRoutes = (props) => {
  const loaderData = useLoaderData();

  return loaderData?.adminProfile ? (
    <Outlet />
  ) : (
    <Navigate to={props.destination} replace />
  );
};
export async function loader() {
  let res;
  try {
    res = await fetchAdminProfile();
  } catch (err) {
    return err;
  }
  if (!res?.adminProfile) {
    store.dispatch(
      uiActions.setSnackBar({
        status: true,
        message: "You need to Login",
        severity: "warning",
      })
    );
    return redirect("/login");
  } else {
    let url = window.location.href;
    if (
      !url.endsWith("/admins") ||
      res.adminProfile.role === roleTypes.SUPER_ADMIN
    ) {
      return res;
    } else {
      store.dispatch(
        uiActions.setSnackBar({
          status: true,
          message: "Unauthorized access",
          severity: "warning",
        })
      );
      return redirect("/login");
    }
  }
}
export default ProtectedRoutes;
