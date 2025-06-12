import { createSlice } from '@reduxjs/toolkit';
import { createBrand } from '../api/brandAPI';

const initialState = {
  loading: false,
  error: null,
  brand_url: '',
};

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.brand_url = action.payload.data.base_url;
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create brand';
      });
  },
});

export default brandSlice;
