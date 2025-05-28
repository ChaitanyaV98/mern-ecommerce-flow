import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart } from "@/services/shop/cart/addToCart";
import { deleteCartItem } from "@/services/shop/cart/deleteCartItem";
import { updateCartQty } from "@/services/shop/cart/updateCartQty";
import fetchCartItems from "@/services/shop/cart/fetchCartItems";

const initialState = {
  cartItems: [],
  isLoading: false,
};

export const addToShoppingCart = createAsyncThunk(
  "/cart/addToCart ",
  async ({ userId, productId, quantity }) => {
    return await addToCart({ userId, productId, quantity });
  }
);

export const getShoppingCartItems = createAsyncThunk(
  "/cart/fetchCartItems",
  async (userId) => {
    return await fetchCartItems(userId);
  }
);

export const deleteShopCartItem = createAsyncThunk(
  "/cart/deleteCartItem",
  async ({ userId, productId }) => {
    return await deleteCartItem({ userId, productId });
  }
);

export const updateShopCartQty = createAsyncThunk(
  "/cart/updateCartQty",
  async ({ userId, productId, quantity }) => {
    return await updateCartQty({ userId, productId, quantity });
  }
);
const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    //here we need to handle four crud op states
    builder
      .addCase(addToShoppingCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToShoppingCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToShoppingCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(getShoppingCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShoppingCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(getShoppingCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(updateShopCartQty.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateShopCartQty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateShopCartQty.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteShopCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteShopCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteShopCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});
export const { clearCart } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
