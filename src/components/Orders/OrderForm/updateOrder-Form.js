import React, { useRef } from "react";
import {
  Button,
  TextField,
  Typography,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { updateOrder } from "../../../utils/api";
import "../OrderForm/orderForm.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../store/ui-slice";
import { orderActions } from "../../../store/order-slice";

const FINAL_BTN_ACTION = {
  addProduct: "Create Product",
  updateProduct: "Update Product",
};

const UpdateOrderForm = ({ action }) => {
  const dispatch = useDispatch();
  const updateId = useSelector((state) => state.order.updateOrderId);

  const matches = useMediaQuery("(max-width:700px)");
  const deliverystatusRef = useRef();

  const handleProductAction = async (event) => {
    event.preventDefault();

    const orderDetails = {
      deliveryStatus: deliverystatusRef.current.value,
    };

    if (action === "update") {
      let updateObj = {};
      for (let key in orderDetails) {
        if (orderDetails[key]) {
          updateObj[key] = orderDetails[key];
        }
      }
      dispatch(
        orderActions.setFetchOrderData({
          status: true,
          activity: "Updating..",
        })
      );
      try {
        dispatch(uiActions.setUpdateModelState(false));
        await updateOrder(updateObj, updateId);
        dispatch(
          orderActions.setFetchOrderData({
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
          Update Order
        </Typography>
      </div>
      <form
        className="update-form"
        onSubmit={handleProductAction}
        method="post"
      >
        <div>
          <TextField
            inputRef={deliverystatusRef}
            id="outlined-select-status"
            select
            name="DeliveryStatus"
            label="DeliveryStatus"
            defaultValue="Pending"
            fullWidth={true}
          >
            {["Pending", "Shipped", "Out For Delivery"].map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
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
          {(action === "add" && FINAL_BTN_ACTION.addProduct) ||
            FINAL_BTN_ACTION.updateProduct}
        </Button>
      </form>
    </div>
  );
};

export default UpdateOrderForm;
