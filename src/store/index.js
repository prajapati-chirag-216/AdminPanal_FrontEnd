import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import uiReducer from "./ui-slice";
import productReducer from "./product-slice";
import categoryReducer from "./category-slice";
import orderReducer from './order-slice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    product: productReducer,
    category: categoryReducer,
    order:orderReducer
  },
});
export default store;
