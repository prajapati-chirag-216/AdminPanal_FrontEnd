import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  useMediaQuery,
  MenuItem,
} from "@mui/material";
import { Await, useLoaderData } from "react-router-dom";
import AddPhotoAlternate from "@mui/icons-material/AddPhotoAlternate";
import { Suspense } from "react";
import classes from "./AddDisplayForm.module.css";
import { useDispatch } from "react-redux";
import { addDisplayImage, fetchAdminProfile } from "../../../../utils/api";
import { uiActions } from "../../../../store/ui-slice";
import { fetchCategories } from "../../../../utils/api";

const AddDisplayForm = (props) => {
  const dispatch = useDispatch();
  const [imageName, setImageName] = useState("");
  const matches = useMediaQuery("(max-width:700px)");
  const textRef = useRef();
  const labelRef = useRef();
  const imageRef = useRef();
  const categoryRef = useRef();

  const loaderData = useLoaderData();

  const changeNameHandler = (event) => {
    const name = event.target.files[0].name;
    if (name !== "") {
      document.getElementById("file-div").style.borderColor = "black";
    }
    setImageName(name);
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();
    if (!imageRef.current.files[0]) {
      return (document.getElementById("file-div").style.borderColor = "red");
    }
    dispatch(uiActions.setAddModelState(false));
    const data = {
      text: textRef.current.value,
      label: labelRef.current.value,
      image: imageRef.current.files[0],
      categoryName: categoryRef.current.value,
    };
    props.onStateChange({ status: true, activity: "Uploading.." });
    try {
      await addDisplayImage(data);
    } catch (err) {
      props.onStateChange({ status: false, activity: "None" });
      throw err;
    }
    props.onStateChange(null, true);
  };

  return (
    <div>
      <div>
        <Typography variant={matches ? "h5" : "h4"} fontWeight="500">
          Add Display
        </Typography>
      </div>
      <form className={classes["display-form"]} onSubmit={submitFormHandler}>
        <TextField
          inputRef={textRef}
          id="outlined-basic"
          label="Text"
          name="text"
          variant="outlined"
          fullWidth={true}
          autoComplete="off"
          required
        />

        <TextField
          inputRef={labelRef}
          id="outlined-basic"
          label="Product Label"
          name="label"
          variant="outlined"
          fullWidth={true}
          autoComplete="off"
          required
        />

        <Suspense>
          <Await resolve={loaderData}>
            {(categories) => (
              <TextField
                inputRef={categoryRef}
                id="outlined-select-category"
                label="Product Category"
                name="category"
                fullWidth={true}
                required
                select
                defaultValue={categories[0]?.name}
              >
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </Await>
        </Suspense>

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
              id="img-tag"
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
          Add Display
        </Button>
      </form>
    </div>
  );
};

export async function loader() {
  let result;
  try {
    result = await fetchCategories();
  } catch (err) {
    throw err;
  }
  return result.length > 0 ? result : [{ name: "No-Category", _id: "Empty" }];
}

export default AddDisplayForm;
