import * as React from "react";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import OrderTable from "./OrderTable/OrderTable";
import { orderActions } from "../../store/order-slice";
import { getOrderById } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../utils/api";
import { Close } from "@mui/icons-material";
import "./order.styles.scss";
import { Typography } from "@mui/material";

const Orders = () => {
  const [orderId, setOrderId] = useState("");
  const dispatch = useDispatch();
  const [isSearchMode, setIsSearchMode] = useState("");

  const fetchOrderData = useSelector((state) => state.order.fetchOrderData);
  const searchChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsSearchMode(true);
    } else {
      setIsSearchMode(false);
    }
    setOrderId(event.target.value);
  };
  const handleSearchOrder = async () => {
    setIsSearchMode(true);

    const fetch = async () => {
      try {
        const Data = await getOrderById(orderId);
        dispatch(orderActions.setOrders(Data));
      } catch (err) {
        console.error(err);
      }
    };
    try {
      if (!fetchOrderData.status || fetchOrderData.activity === "Fetching..") {
        fetch()
          .then((res) =>
            dispatch(
              orderActions.setFetchOrderData({
                status: false,
                activity: "None",
              })
            )
          )
          .catch((err) => err);
      }
    } catch (err) {
      throw err;
    }
  };

  const handleCloseFilter = async () => {
    // const fetch = async () => {
    //   try {
    //     const data = await fetchOrders();
    //     dispatch(orderActions.setOrders(data));
    //     setOrderId("");
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };
    // try {
    //   if (!fetchOrderData.status || fetchOrderData.activity === "Fetching..") {
    //     fetch()
    //       .then((res) =>
    //         dispatch(
    //           orderActions.setFetchOrderData({
    //             status: false,
    //             activity: "None",
    //           })
    //         )
    //       )
    //       .catch((err) => err);
    //   }
    // } catch (err) {
    //   throw err;
    // }
    setOrderId("");
    setIsSearchMode(false);
  };

  return (
    <div className="orderPageContainer">
      <div className="orderPageHeaderContainer">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
            marginTop: "1rem",
            marginBottom: "0.5rem",
            boxShadow: "0px 0px 5px rgb(180,180,180)",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Order by Transaction-Id"
            inputProps={{ "aria-label": "search order by Transaction-Id" }}
            value={orderId}
            onChange={searchChangeHandler}
            // onChange={(e) => setOrderId(e.target.value)}
          />
          {isSearchMode && (
            <Close
              style={{
                cursor: "pointer",
                transform: "scale(0.9)",
                color: "gray",
              }}
              onClick={handleCloseFilter}
            />
          )}
          <IconButton
            onClick={handleSearchOrder}
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
      <Typography
        align="center"
        sx={{
          letterSpacing: "1px",
          alignSelf: "center",
          position: "fixed",
          fontSize: "1.6rem",
          marginTop: "0.5rem",
          color: "rgb(80,80,80)",
          width: "11rem",
          textTransform: "uppercase",
          borderBottom: "1px solid rgb(80,80,80)",
        }}
      >
        Orders
      </Typography>
      <div>
        <OrderTable />
      </div>
    </div>
  );
};

export default Orders;
