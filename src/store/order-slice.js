import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  updateOrderId: "",
  fetchOrderData: { status: true, activity: "Fetching.." },
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders(state, action) {
    
      state.orders = action.payload;
      
    },
    setFetchOrderData(state, action) {
      state.fetchOrderData.status = action.payload.status;
      state.fetchOrderData.activity = action.payload.activity;
    },
    setUpdateOrderId(state, action) {
      state.updateOrderId = action.payload;
    }
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
