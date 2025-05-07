import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import toastSlice from "./toast-slice";
import adminProductsSlice from "./admin/productSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    toast: toastSlice,
    adminProducts: adminProductsSlice,
  },
});

export default store;
