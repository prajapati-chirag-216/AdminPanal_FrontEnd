import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  updateCategoryId: "",
  fetchCategoryData: { status: true, activity: "Fetching.." },
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories(state, action) {
      // if (action.payload.type === "DELETE") {
      //   let filteredCategories = [...state.categories];
      //   filteredCategories = filteredCategories.filter(
      //     (category) => category._id !== action.payload.categoryId
      //   );
      //   state.categories = filteredCategories;
      // } else if (action.payload.type === "UPDATE") {
      //   let filteredCategories = [...state.categories];
      //   filteredCategories = filteredCategories.filter(
      //     (category) => category._id !== action.payload.updatedProduct._id
      //   );
      //   state.categories = [
      //     ...filteredCategories,
      //     action.payload.updatedProduct,
      //   ];
      // } else if (action.payload.type === "ADD") {
      //   state.categories = [...state.categories, action.payload.newProduct];
      // } else {
        state.categories = action.payload;
      // }
    },
    setFetchCategoryData(state, action) {
      state.fetchCategoryData.status = action.payload.status;
      state.fetchCategoryData.activity = action.payload.activity;
    },
    setUpdateCategoryId(state, action) {
      console.log(action.payload,'kjhtg')
      state.updateCategoryId = action.payload;
    },
  },
});

export const categoryActions = categorySlice.actions;

export default categorySlice.reducer;
