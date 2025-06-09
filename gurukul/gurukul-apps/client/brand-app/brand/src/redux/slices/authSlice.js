import { createSlice } from '@reduxjs/toolkit';
import {
  verifyEducatorRole,
  verifyEducatorToken,
  verifyFounderRole,
  verifyFounderToken,
  verifyUserRole,
  verifyUserToken,
} from '../api/authAPI';

const initialState = {
  user: {},
  isAuthenticated: false,
  isLoading: false,
  error: null,
  token: null,
  userRole: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      console.log(action);
      if (action.payload.statusCode === 200) {
        state.user = action.payload.data;
        state.isAuthenticated = true;
      } else {
        state.isAuthenticated = false;
        state.error = action.payload.message || 'Login failed';
        state.user = {};
      }
    },
    logout: (state) => {
      state.user = {};
      state.isAuthenticated = false;
      state.token = null;
      state.userRole = '';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyEducatorToken.pending, (state) => {
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
        state.error = action.payload || 'Failed to verify token';
        state.user = {};
        state.token = null;
        state.userRole = '';
      })
      .addCase(verifyEducatorRole.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyEducatorRole.fulfilled, (state, action) => {
        console.log('verifyEducatorRole fulfilled', action);
        state.isLoading = false;
        state.userRole = action.payload.data.role;
      })
      .addCase(verifyEducatorRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to verify role';
        state.userRole = '';
      })
      .addCase(verifyFounderToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyFounderToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(verifyFounderToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload || 'Failed to verify founder token';
        state.user = {};
        state.token = null;
        state.userRole = '';
      })
      .addCase(verifyFounderRole.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyFounderRole.fulfilled, (state, action) => {
        console.log('verifyFounderRole fulfilled', action);
        state.isLoading = false;
        state.userRole = action.payload.data.role;
      })
      .addCase(verifyFounderRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to verify founder role';
        state.userRole = '';
      })
      .addCase(verifyUserToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyUserToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(verifyUserToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload || 'Failed to verify user token';
        state.user = {};
        state.token = null;
        state.userRole = '';
      })
      .addCase(verifyUserRole.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyUserRole.fulfilled, (state, action) => {
        console.log('verifyUserRole fulfilled', action);
        state.isLoading = false;
        state.userRole = action.payload.data.role;
      })
      .addCase(verifyUserRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to verify user role';
        state.userRole = '';
      });
  },
});

export default authSlice;
export const { login, logout } = authSlice.actions;
