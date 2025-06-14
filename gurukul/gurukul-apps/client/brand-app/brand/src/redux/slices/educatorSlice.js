import { loginEducator, registerEducator } from '../api/educatorAPI';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  educator: {},
  loading: false,
  error: null,
  success: false,
  message: '',
};

const educatorSlice = createSlice({
  name: 'educator',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerEducator.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerEducator.fulfilled, (state, action) => {
        console.log('Registration successful:', action.payload);
        state.loading = false;
        state.educator = action.payload.educator;
        state.success = true;
        state.message = action.payload.message || 'Registration successful';
      })
      .addCase(registerEducator.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
        state.success = false;
      })
      .addCase(loginEducator.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginEducator.fulfilled, (state, action) => {
        console.log('Login successful:', action.payload);
        state.loading = false;
        state.educator = action.payload.educator;
        state.success = true;
        state.message = action.payload.message || 'Login successful';
      })
      .addCase(loginEducator.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'Login failed';
        state.success = false;
      });
  },
});

export default educatorSlice;
