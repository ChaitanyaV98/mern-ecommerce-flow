import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      // Handle error: return custom error message if available

      console.log("Error in register User----", error);
      return rejectWithValue(
        error.response?.data || { message: "Registration failed" }
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "${import.meta.env.VITE_API_URL}/api/auth/login",
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      // Handle error: return custom error message if available

      console.log("Error in Login User----", error);
      return rejectWithValue(
        error.response?.data || { message: "Login failed" }
      );
    }
  }
);

export const checkAuth = createAsyncThunk(
  "/auth/checkauth",

  async () => {
    const response = await axios.get(
      "${import.meta.env.VITE_API_URL}/api/auth/check-auth",
      {
        withCredentials: true,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
    console.log("RESPONSE OF CHECK AUTHHHHHH----", response);
    return response.data;
  }
);

export const logoutUser = createAsyncThunk(
  "/auth/logout",

  async () => {
    const response = await axios.post(
      "${import.meta.env.VITE_API_URL}/api/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserAuthenticated: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
  },
  //when we are getting data back from extra reducers thunk then we need to store the data on my store
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
        if (action.payload.token) {
          sessionStorage.setItem("token", action.payload.token); // save token
          sessionStorage.setItem("user", JSON.stringify(action.payload.user)); // save user too
        }
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

// export const { setUser } = authSlice.actions;
export const { setUserAuthenticated } = authSlice.actions;
export default authSlice.reducer;
