import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import addProduct from "@/services/admin/addProduct.js";
import updateProduct from "@/services/admin/updateProduct.js";
import deleteProduct from "@/services/admin/deleteProduct.js";
import getAllProducts from "@/services/admin/fetchProducts.js";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    return await addProduct(formData);
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    return await getAllProducts();
  }
);

export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }) => {
    return await updateProduct(id, formData);
  }
);

export const deleteSingleProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    return await deleteProduct(id);
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductsSlice.reducer;
