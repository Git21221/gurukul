import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '../api/userAPI';

const initialState = {
  user: {},
  loading: false,
  error: null,
  success: false,
  message: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.success = true;
        state.message = action.payload.message || 'Registration successful';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'Registration failed';
        state.success = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.success = true;
        state.message = action.payload.message || 'Login successful';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'Login failed';
        state.success = false;
      });
  },
});

export default userSlice;
