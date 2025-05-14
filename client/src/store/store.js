import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import toastSlice from "./toast-slice";
import adminProductsSlice from "./admin/productSlice";
import shoppingProductSlice from "./shop/productSlice";
import shoppingCartSlice from "./shop/cartSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    toast: toastSlice,
    adminProducts: adminProductsSlice,
    shopProducts: shoppingProductSlice,
    shopCart: shoppingCartSlice,
  },
});

export default store;
