import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Navigate,
  Outlet,
  redirect,
  useLoaderData,
  useLocation,
} from "react-router-dom";
import { fetchAdminProfile } from "../utils/api";
import { uiActions } from "../store/ui-slice";
import store from "../store";
import roleTypes from "../utils/roles/roleTypes";

const ProtectedRoutes = (props) => {
  const loaderData = useLoaderData();
  const [verifiedAdmin, setVerifiedAdmin] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (loaderData?.adminProfile) {
      if (location.pathname.endsWith("/admins")) {
        if (loaderData.adminProfile.role === roleTypes.SUPER_ADMIN) {
          setVerifiedAdmin(true);
        } else {
          setVerifiedAdmin(false);
          dispatch(
            uiActions.setSnackBar({
              status: true,
              message: "Unauthorized access",
              severity: "warning",
            })
          );
        }
      } else {
        setVerifiedAdmin(!!loaderData?.adminProfile);
      }
    }
  }, []);
  return verifiedAdmin ? (
    <Outlet />
  ) : (
    verifiedAdmin != null && (
      <Fragment>
        <Navigate to={props.destination} replace />
      </Fragment>
    )
  );
  // return loaderData?.adminProfile ? <Outlet /> : element;
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
        severity: "wanrning",
      })
    );
    return redirect("/login");
  } else {
    return res;
  }
}
export default ProtectedRoutes;
