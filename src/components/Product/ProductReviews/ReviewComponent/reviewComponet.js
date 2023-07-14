import { Fragment, useEffect, useState } from "react";
import { Rating, Typography } from "@mui/material";
import moment from "moment";
import "./review.style.scss";

const ReviewContainer = (props) => {
  const [review, setReview] = useState(null);

  useEffect(() => {
    setReview(props.review);
  }, [props.review]);

  return (
    <Fragment>
      {review !== null && (
        <div className="reviewDivContainer">
          <Rating
            name="rating"
            value={review.rating}
            readOnly
            precision={0.5}
            sx={{ color: "black" }}
          />
          <Typography
            sx={{
              color: "black",
              fontSize: "20px",
              letterSpacing: "2px",
            }}
          >
            {review.title.toUpperCase()}
          </Typography>

          <Typography
            sx={{ color: "black", fontSize: "20px", paddingRight: "10rem" }}
          >
            {review.description}
          </Typography>

          <Typography sx={{ fontSize: "20px" }}>
            {`${review.name} on ${moment(review.createdAt).format(
              "MMM DD, YYYY"
            )}`}
          </Typography>
        </div>
      )}
    </Fragment>
  );
};

export default ReviewContainer;
