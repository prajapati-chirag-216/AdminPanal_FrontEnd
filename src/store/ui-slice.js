import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: false,
  success: false,
  addModelState: false,
  updateModelState: false,
  productName:localStorage.getItem('productName')||'',
  ReviewChange:false
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setNotification(state, action) {
      if (action.payload) {
        state.notification = {
          status: action.payload.status,
          message: action.payload.message,
        };
      }
    },
    setSuccess(state, action) {
      state.success = action.payload;
    },
    setAddModelState(state, action) {
      state.addModelState = action.payload;
    },
    setReviewChange(state,action){
      state.ReviewChange = action.payload
    },
  setProductName(state,action){
      localStorage.setItem('productName',action.payload)
    state.productName = action.payload
  },
    setUpdateModelState(state, action) {
      state.updateModelState = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
