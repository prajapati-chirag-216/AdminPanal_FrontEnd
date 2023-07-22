import { Await, useLoaderData } from "react-router-dom";
import { fetchProductReviews } from "../../../utils/api";
import { Fragment, Suspense, useEffect, useState } from "react";

import ReviewTable from "./ReviewTable/reviewTable";
import "./productreview.style.scss";
import { Typography } from "@mui/material";
import { uiActions } from "../../../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import SimpleModal from "../../Dekstop/Modal/Modal";
import StatusButton from "../../Dekstop/StatusButton/StatusButton";
import AddReviewForm from "../Form/AddReviewForm";
import AddIcon from "@mui/icons-material/Add";

const ProductReviews = () => {
  const [loaderData, setLoaderData] = useState(useLoaderData());
  // const [productName, setProductName] = useState(
  //   useSelector((state) => state.ui.productName)
  // );
  const productName = useSelector((state) => state.ui.productName);
  const dispatch = useDispatch();
  const showModel = useSelector((state) => state.ui.addModelState);
  const ReviewChange = useSelector((state) => state.ui.ReviewChange);

  useEffect(() => {
    setLoaderData(loader());
  }, [ReviewChange]);

  const handleCreateChange = () => {
    dispatch(uiActions.setAddModelState(true));
  };

  const closeModelHandler = () => {
    dispatch(uiActions.setAddModelState(false));
  };

  return (
    <Fragment>
      <div className="reviewPageContainer">
        {showModel && (
          <SimpleModal onOpen={showModel} onClose={closeModelHandler}>
            <AddReviewForm />
          </SimpleModal>
        )}

        <StatusButton
          isLoading={false}
          icon={<AddIcon />}
          onClick={handleCreateChange}
        >
          Add Review
        </StatusButton>

        {productName !== "" && (
          <Typography
            align="center"
            sx={{
              letterSpacing: "1px",
              alignSelf: "center",
              fontSize: "1.6rem",
              color: "rgb(80,80,80)",
              width: "fit-content",
              textTransform: "uppercase",
              borderBottom: "1px solid rgb(80,80,80)",
              marginLeft: "5rem",
            }}
          >
            {`REVIEWS ON ${productName}`}
          </Typography>
        )}
      </div>

      <Suspense>
        <Await resolve={loaderData}>
          {(reviews) => {
            return reviews.length !== 0 ? (
              <ReviewTable reviews={reviews} />
            ) : (
              <Typography
                sx={{
                  position: "absolute",
                  alignSelf: "center",
                  top: "30rem",
                  letterSpacing: "2px",
                  color: "rgb(120,120,120)",
                }}
                variant="h4"
              >{`No Reviews  On ${productName} Yet !`}</Typography>
            );
          }}
        </Await>
      </Suspense>
    </Fragment>
  );
};

export async function loader() {
  let response;

  let url = window.location.href;
  let urlArray = url.split("/");

  const productId = urlArray[urlArray.length - 1];
  try {
    response = await fetchProductReviews(productId);
    return response;
  } catch (err) {
    throw err;
  }
}
export default ProductReviews;
