import React, { useState, useRef, Suspense } from "react";
import {
  Button,
  TextField,
  Typography,
  MenuItem,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import AddPhotoAlternate from "@mui/icons-material/AddPhotoAlternate";
import {
  addAdmin,
  fetchCategories,
  updateCategory,
  updateAdmin,
} from "../../../utils/api";
import classes from "./AddAdminForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { adminActions } from "../../../store/admin-slice";
import { Await, useLoaderData, Form } from "react-router-dom";
import { uiActions } from "../../../store/ui-slice";
import roleTypes from "../../../utils/roles/roleTypes";
const FINAL_BTN_ACTION = {
  addAdmin: "Create Admin",
  updateAdmin: "Update Admin",
};

const ADMIN_ROLES = [roleTypes.ADMIN, roleTypes.SUPER_ADMIN];

const AddAdminForm = ({ action }) => {
  const dispatch = useDispatch();
  const updateId = useSelector((state) => state.admin.updateAdminId);

  const matches = useMediaQuery("(max-width:700px)");
  const nameRef = useRef();
  const emailRef = useRef();
  const roleRef = useRef();

  const handleAdminAction = async (event) => {
    event.preventDefault();

    const adminDetails = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      role: roleRef.current.value,
    };
    if (action === "add") {
      dispatch(
        adminActions.setFetchAdminData({
          status: true,
          activity: "Adding..",
        })
      );
      try {
        dispatch(uiActions.setAddModelState(false));
        await addAdmin(adminDetails);
        dispatch(
          adminActions.setFetchAdminData({
            status: false,
            activity: "Adding..",
          })
        );
      } catch (err) {
        dispatch(
          adminActions.setFetchAdminData({
            status: false,
            activity: "Adding..",
          })
        );
        throw err;
      }
    } else if (action === "update") {
      let updateObj = {};
      for (let key in adminDetails) {
        if (adminDetails[key]) {
          updateObj[key] = adminDetails[key];
        }
      }
      dispatch(
        adminActions.setFetchAdminData({
          status: true,
          activity: "Updating..",
        })
      );
      try {
        dispatch(uiActions.setUpdateModelState(false));
        await updateAdmin(updateObj, updateId);
        dispatch(
          adminActions.setFetchAdminData({
            status: false,
            activity: "Updating..",
          })
        );
      } catch (err) {
        dispatch(
          adminActions.setFetchAdminData({
            status: false,
            activity: "Updating..",
          })
        );
        throw err;
      }
    }
  };
  return (
    <div>
      <div>
        <Typography
          variant={matches ? "h6" : "h5"}
          fontWeight="500"
          sx={{ fontSize: !matches ? "2rem" : "1.5rem" }}
        >
          {action === "add" ? "Add Admin" : "Update Admin"}
        </Typography>
      </div>
      <form
        className={classes["admin-form"]}
        onSubmit={handleAdminAction}
        method="post"
      >
        <div>
          <TextField
            inputRef={nameRef}
            id="name"
            label="Admin Name"
            name="name"
            variant="outlined"
            fullWidth={true}
            autoComplete="off"
            required={action === "add"}
          />
          <TextField
            inputRef={roleRef}
            id="role"
            select
            name="role"
            label="role"
            defaultValue={ADMIN_ROLES[0]}
            fullWidth={true}
          >
            {ADMIN_ROLES.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <TextField
          inputRef={emailRef}
          id="email"
          label="email"
          name="email"
          variant="outlined"
          fullWidth={true}
          autoComplete="off"
          required={action === "add"}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{
            backgroundColor: "black",
            padding: matches ? "0.6rem" : "0.8rem",
            borderRadius: "4px",
            fontSize: matches ? "0.8rem" : "1rem",
            "&:hover": { backgroundColor: "black" },
          }}
        >
          {(action === "add" && FINAL_BTN_ACTION.addAdmin) ||
            FINAL_BTN_ACTION.updateAdmin}
        </Button>
      </form>
    </div>
  );
};
export default AddAdminForm;
