import { createSlice } from '@reduxjs/toolkit';
import { verifyFounderRole, verifyFounderToken } from '../api/authAPI';
import { loginFounder } from '../api/founderAPI';

const initialState = {
  founder: {},
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
        state.founder = action.payload.data;
        state.isAuthenticated = true;
      } else {
        state.isAuthenticated = false;
        state.error = action.payload.message || 'Login failed';
        state.founder = {};
      }
    },
    logout: (state) => {
      state.founder = {};
      state.isAuthenticated = false;
      state.token = null;
      state.userRole = '';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyFounderToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyFounderToken.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.statusCode === 200) {
          state.founder = action.payload.data;
          state.isAuthenticated = true;
          state.token = action.payload.token;
          state.userRole = action.payload.role || '';
        } else {
          state.isAuthenticated = false;
          state.error = action.payload.message || 'Token verification failed';
          state.founder = {};
        }
      })
      .addCase(verifyFounderToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.error.message || 'Token verification failed';
        state.founder = {};
      })
      .addCase(verifyFounderRole.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyFounderRole.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.statusCode === 200) {
          state.userRole = action.payload.data.role || '';
        } else {
          state.error = action.payload.message || 'Role verification failed';
        }
      })
      .addCase(verifyFounderRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Role verification failed';
      })
      .addCase(loginFounder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(loginFounder.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.statusCode === 200) {
          state.founder = action.payload.data;
          state.isAuthenticated = true;
          state.token = action.payload.token;
          state.userRole = action.payload.data.role || '';
        } else {
          state.isAuthenticated = false;
          state.error = action.payload.message || 'Login failed';
          state.founder = {};
        }
      })
      .addCase(loginFounder.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.error.message || 'Login failed';
        state.founder = {};
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice;
