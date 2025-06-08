import { createSlice } from "@reduxjs/toolkit";
import { verifyEducatorRole, verifyEducatorToken } from "../api/authAPI";

const initialState = {
  user: {},
  isAuthenticated: false,
  isLoading: false,
  error: null,
  token: null,
  userRole: "",
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log(action);
      if(action.payload.statusCode === 200) {
        state.user = action.payload.data;
        state.isAuthenticated = true;
      }
      else {
        state.isAuthenticated = false;
        state.error = action.payload.message || "Login failed";
        state.user = {};
      }
    },
    logout: (state) => {
      state.user = {};
      state.isAuthenticated = false;
      state.token = null;
      state.userRole = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(verifyEducatorToken.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(verifyEducatorToken.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
    })
    .addCase(verifyEducatorToken.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload || "Failed to verify token";
      state.user = {};
      state.token = null;
      state.userRole = "";
    })
    .addCase(verifyEducatorRole.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(verifyEducatorRole.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userRole = action.payload.data.role;
    })
    .addCase(verifyEducatorRole.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to verify role";
      state.userRole = "";
    });
  }
});

export default authSlice;
export const { login, logout } = authSlice.actions;