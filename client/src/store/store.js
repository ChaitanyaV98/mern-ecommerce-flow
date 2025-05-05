import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import toastSlice from "./toast-slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    toast: toastSlice,
  },
});

export default store;
