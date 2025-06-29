import { createSlice } from '@reduxjs/toolkit';
import { loginFounder } from '../api/founderAPI';

const initialState = {
  founder: {},
  loading: false,
  error: null,
  success: false,
  message: '',
};

const founderSlice = createSlice({
  name: 'founder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginFounder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginFounder.fulfilled, (state, action) => {
        state.loading = false;
        state.founder = action.payload;
        state.success = true;
        state.message = action.payload.message || 'Login successful';
      })
      .addCase(loginFounder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        state.message = action.payload?.message || 'Login failed';
      });
  },
});
export default founderSlice;
