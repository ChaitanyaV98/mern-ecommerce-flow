import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  isLoading: false,
};

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //here we need to handle four crud op states
  },
});
