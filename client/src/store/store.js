import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import toastSlice from "./toast-slice";
import adminProductsSlice from "./admin/productSlice";
import adminOrderSlice from "./admin/order-slice";
import shoppingProductSlice from "./shop/productSlice";
import shoppingCartSlice from "./shop/cartSlice";
import addressSlice from "./shop/addressSlice";
import shoppingOrderSlice from "./order-slice";
import shopSearchSlice from "./shop/search-slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    toast: toastSlice,
    adminProducts: adminProductsSlice,
    adminOrder: adminOrderSlice,
    shopProducts: shoppingProductSlice,
    shopCart: shoppingCartSlice,
    shopAddress: addressSlice,
    shopOrder: shoppingOrderSlice,
    shopSearch: shopSearchSlice,
  },
});

export default store;
