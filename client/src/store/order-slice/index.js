import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder } from "@/services/shop/checkout/createOrder";
import { capturePayment } from "@/services/shop/checkout/capturePayment";
import fetchAllOrders from "@/services/shop/checkout/fetchOrders";
import fetchOrderDetails from "@/services/shop/checkout/fetchOrderDetails";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

export const createNewOrder = createAsyncThunk(
  "/order/createNewOrder",
  async (orderData) => {
    return await createOrder(orderData);
  }
);

export const capturePaypalPayment = createAsyncThunk(
  "/order/capturePaypalPayment",
  async ({ token, payerID }, { rejectWithValue }) => {
    try {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
      const data = await capturePayment({ token, payerID, orderId });
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Payment capture failed"
      );
    }
  }
);

export const getAllOrdersByUser = createAsyncThunk(
  "/order/getAllOrders",
  async (userId) => {
    try {
      const data = await fetchAllOrders(userId);
      return data;
    } catch (err) {
      console.log("Err---", err);
      return err;
    }
  }
);

export const getOrderDetails = createAsyncThunk(
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
const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        //state.orderId = action.payload.orderId;
        state.orderId = action.payload.mongoOrderId; // Use MongoDB ID ✅
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.mongoOrderId)
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      })
      .addCase(getAllOrdersByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUser.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = shoppingOrderSlice.actions;

export default shoppingOrderSlice.reducer;
