import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import uiReducer from "./ui-slice";
import productReducer from "./product-slice";
import categoryReducer from "./category-slice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    product: productReducer,
    category: categoryReducer,
  },
});
export default store;
