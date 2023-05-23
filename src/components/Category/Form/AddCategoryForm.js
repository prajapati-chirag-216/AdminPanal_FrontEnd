import React, { useState, useRef } from "react";
import { Button, TextField, Typography, useMediaQuery } from "@mui/material";
import AddPhotoAlternate from "@mui/icons-material/AddPhotoAlternate";
import {
  addCategory,
  updateCategories,
  updateProduct,
} from "../../../utils/api";
import classes from "./AddCategoryForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../../store/category-slice";
import { uiActions } from "../../../store/ui-slice";

const FINAL_BTN_ACTION = {
  addCategory: "Create Category",
  updateCategory: "Update Category",
};

const AddCategoryForm = ({ action }) => {
  const dispatch = useDispatch();
  const updateId = useSelector((state) => state.category.updateCategoryId);

  const [imageName, setImageName] = useState("");
  const matches = useMediaQuery("(max-width:700px)");
  const nameRef = useRef();
  const imageRef = useRef();

  const changeNameHandler = (event) => {
    let name = "";
    if (event.target.files[0]) {
      name = event.target.files[0].name;
      document.getElementById("file-div").style.borderColor = "black";
    }
    setImageName(name);
  };

  const handleProductAction = async (event) => {
    event.preventDefault();
    const categoryDetails = {
      name: nameRef.current.value,
      image: imageRef.current.files[0],
    };
    if (action === "add") {
      dispatch(
        categoryActions.setFetchCategoryData({
          status: true,
          activity: "Adding..",
        })
      );
      try {
        dispatch(uiActions.setAddModelState(false));
        await addCategory(categoryDetails);
        dispatch(
          categoryActions.setFetchCategoryData({
            status: false,
            activity: "Adding..",
          })
        );
      } catch (err) {
        throw err;
      }
    } else if (action === "update") {
      let updateObj = {};
      for (let key in categoryDetails) {
        if (categoryDetails[key]) {
          updateObj[key] = categoryDetails[key];
        }
      }
      dispatch(
        categoryActions.setFetchCategoryData({
          status: true,
          activity: "Updating..",
        })
      );
      try {
        dispatch(uiActions.setUpdateModelState(false));
        await updateCategories(updateObj, updateId);
        dispatch(
          categoryActions.setFetchCategoryData({
            status: false,
            activity: "Updating..",
          })
        );
      } catch (err) {
        throw err;
      }
    }
  };
  return (
    <div>
      <div>
        <Typography variant={matches ? "h5" : "h4"} fontWeight="500">
          Add Category
        </Typography>
      </div>
      <form
        className={classes["product-form"]}
        onSubmit={handleProductAction}
        method="post"
      >
        <TextField
          inputRef={nameRef}
          id="outlined-basic"
          label="Category Name"
          name="name"
          variant="outlined"
          fullWidth={true}
          autoComplete="off"
          required={action === "add"}
        />

        <div className={classes["file-input"]} id="file-div">
          <label htmlFor="inputTag" id="image-label">
            <AddPhotoAlternate
              style={{
                textAlign: "end",
                fill: "rgb(83, 83, 83)",
              }}
            />
            <Typography
              paddingLeft="0.5rem"
              fontSize="1rem"
              color="gray"
              style={{
                alignSelf: "center",
              }}
            >
              {imageName === "" ? "Add Image" : imageName}
            </Typography>
          </label>
          <input
            ref={imageRef}
            id="inputTag"
            name="image"
            type="file"
            accept="image/*"
            onChange={changeNameHandler}
          />
        </div>
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
          {(action === "add" && FINAL_BTN_ACTION.addCategory) ||
            FINAL_BTN_ACTION.updateCategory}
        </Button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
