import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
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
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
