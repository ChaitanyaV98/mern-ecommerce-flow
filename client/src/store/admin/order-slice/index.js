import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchAllOrders from "@/services/admin/fetchAllOrders";
import fetchOrderDetails from "@/services/admin/fetchOrderDetails";

const initialState = {
  orderList: [],
  orderDetails: null,
};

export const getAllOrdersForAdmin = createAsyncThunk(
  "/order/getAllOrdersForAdmin",
  async () => {
    try {
      const data = await fetchAllOrders();
      return data;
    } catch (err) {
      console.log("Err---", err);
      return err;
    }
  }
);

export const getOrderDetailsForAdmin = createAsyncThunk(
  "/order/getOrderDetails",
  async (id) => {
    try {
      const data = await fetchOrderDetails(id);
      return data;
    } catch (err) {
      console.log("Error--->>", err);
      return err;
    }
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = adminOrderSlice.reducer;

export default adminOrderSlice.reducer;
