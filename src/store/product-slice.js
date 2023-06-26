import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  updateProductId: "",
  reviews:[],
  fetchProductData: { status: true, activity: "Fetching.." },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setFetchProductData(state, action) {
      state.fetchProductData.status = action.payload.status;
      state.fetchProductData.activity = action.payload.activity;
    },
    setProductReviews(state,action){
      state.reviews = action.payload
    },
    setUpdateProductId(state, action) {
      state.updateProductId = action.payload;
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
