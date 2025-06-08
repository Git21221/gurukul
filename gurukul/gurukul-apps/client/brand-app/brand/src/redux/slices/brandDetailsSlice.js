import { createSlice } from "@reduxjs/toolkit";
import { fetchBranding } from "../api/brandDetailsAPI";

const initialState = {
  branding: null,
  loading: false,
  error: null,
};

const brandDetailsSlice = createSlice({
  name: "brandDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBranding.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBranding.fulfilled, (state, action) => {
        state.loading = false;
        state.branding = action.payload;
      })
      .addCase(fetchBranding.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default brandDetailsSlice;
