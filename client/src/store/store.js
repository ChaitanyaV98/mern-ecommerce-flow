import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import toastSlice from "./toast-slice";
import adminProductsSlice from "./admin/productSlice";
import shoppingProductSlice from "./shop/productSlice";
import shoppingCartSlice from "./shop/cartSlice";
import addressSlice from "./shop/addressSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    toast: toastSlice,
    adminProducts: adminProductsSlice,
    shopProducts: shoppingProductSlice,
    shopCart: shoppingCartSlice,
    shopAddress: addressSlice,
  },
});

export default store;
