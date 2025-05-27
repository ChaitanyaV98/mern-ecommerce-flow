import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder } from "@/services/shop/checkout/createOrder";
import { capturePayment } from "@/services/shop/checkout/capturePayment";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
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
      const data = await capturePayment({ token, payerID });
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Payment capture failed"
      );
    }
  }
);
const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      });
  },
});

export default shoppingOrderSlice.reducer;
