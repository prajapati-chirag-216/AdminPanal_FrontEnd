import React, { useState, useRef } from "react";
import { Button, TextField, Typography, useMediaQuery } from "@mui/material";
import AddPhotoAlternate from "@mui/icons-material/AddPhotoAlternate";
import classes from "./AddDisplayForm.module.css";
import { useDispatch } from "react-redux";
import { addDisplayImage } from "../../../../utils/api";
import { uiActions } from "../../../../store/ui-slice";

const AddDisplayForm = (props) => {
  const dispatch = useDispatch();
  const [imageName, setImageName] = useState("");
  const matches = useMediaQuery("(max-width:700px)");
  const textRef = useRef();
  const labelRef = useRef();
  const imageRef = useRef();

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
    };
    props.onStateChange({ status: true, activity: "Uploading.." });
    try {
      await addDisplayImage(data);
    } catch (err) {
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

export default AddDisplayForm;
