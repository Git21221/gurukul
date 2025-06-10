import { createAsyncThunk } from '@reduxjs/toolkit';

export const verifyFounderToken = createAsyncThunk(
  'auth/verifyFounderToken',
  async ({ dispatch, source = 'brand' }, { rejectWithValue }) => {
    try {
      const res = await apiClient(
        dispatch,
        'founder/verify-token',
        'GET',
        {},
        source
      );
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const verifyFounderRole = createAsyncThunk(
  'auth/verifyFounderRole',
  async ({ dispatch, source = 'brand' }, { rejectWithValue }) => {
    try {
      const res = await apiClient(
        dispatch,
        'founder/verify-role',
        'GET',
        {},
        source
      );
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
