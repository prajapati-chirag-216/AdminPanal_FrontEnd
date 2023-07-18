import React, { useState, useRef, Suspense } from "react";
import {
  Button,
  TextField,
  Typography,
  MenuItem,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "./AddReviewForm.style.scss";
import { PostReview } from "../../../utils/api";
import { uiActions } from "../../../store/ui-slice";

const AddReviewForm = ({ action }) => {
  const dispatch = useDispatch();

  const ReviewChange = useSelector((state) => state.ui.ReviewChange);

  const matches = useMediaQuery("(max-width:700px)");
  const nameRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const ratingRef = useRef();

  const handleReviewAction = async (event) => {
    event.preventDefault();

    let url = window.location.href;
    let urlArray = url.split("/");
    const productId = urlArray[urlArray.length - 1];

    const ReviewDetails = {
      name: nameRef.current.value,
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      rating: ratingRef.current.value,
    };

    try {
      dispatch(uiActions.setAddModelState(false));
      const response = await PostReview(ReviewDetails, productId);
      dispatch(uiActions.setReviewChange(!ReviewChange));
    } catch (err) {
      throw err;
    }
  };

  return (
    <div>
      <div>
        <Typography variant={matches ? "h5" : "h4"} fontWeight="500">
          Add Review
        </Typography>
      </div>
      <form className="reviewForm" onSubmit={handleReviewAction} method="post">
        <div>
          <TextField
            inputRef={nameRef}
            id="outlined-basic"
            label="User Name"
            name="name"
            variant="outlined"
            fullWidth={true}
            autoComplete="off"
            required
          />
        </div>

        <TextField
          inputRef={titleRef}
          id="outlined-basic"
          label="Title"
          name="title"
          variant="outlined"
          multiline
          fullWidth={true}
          autoComplete="off"
          required
        />

        <TextField
          inputRef={descriptionRef}
          id="outlined-basic"
          label="Description"
          name="discription"
          variant="outlined"
          multiline
          fullWidth={true}
          autoComplete="off"
          maxRows={3}
          required
        />

        <TextField
          inputRef={ratingRef}
          id="outlined-basic"
          label="Rating"
          name="rating"
          variant="outlined"
          multiline
          fullWidth={true}
          autoComplete="off"
          required
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
          Add Review
        </Button>
      </form>
    </div>
  );
};

export default AddReviewForm;
