import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import {
//   addAddress,
//   fetchAddressList,
//   editAddress,
//   deleteAddress,
// } from "@/services/shop/address";
import { addAddress } from "@/services/shop/address/addAddress";
import { fetchAddressList } from "@/services/shop/address/fetchAddressList";
import { editAddress } from "@/services/shop/address/editAddress";
import { deleteAddress } from "@/services/shop/address/deleteAddress";

const initialState = {
  isLoading: false,
  addressList: [],
};

export const addNewAddress = createAsyncThunk(
  "/address/addNewAddress",
  async (formData) => {
    return await addAddress(formData);
  }
);

export const fetchAllAddressList = createAsyncThunk(
  "/address/fetchAllAddresses",
  async (userId) => {
    return await fetchAddressList(userId);
  }
);

export const updateAddress = createAsyncThunk(
  "/address/updateAddress",
  async ({ userId, addressId, formData }) => {
    return await editAddress({ userId, addressId, formData });
  }
);

export const deleteUserAddress = createAsyncThunk(
  "/address/deleteAddress",
  async ({ userId, addressId }) => {
    return await deleteAddress({ userId, addressId });
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state) => {
        state.isLoading = false;
        // state.addressList = action.payload.data;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
        // state.addressList = [];
      })
      .addCase(fetchAllAddressList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddressList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddressList.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default addressSlice.reducer;
