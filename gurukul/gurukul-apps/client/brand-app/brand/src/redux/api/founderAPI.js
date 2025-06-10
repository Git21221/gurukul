import { apiClient } from '@gurukul/shared-client';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginFounder = createAsyncThunk(
  'founder/login',
  async (
    { dispatch, data, brandId, source = 'brand' },
    { rejectWithValue }
  ) => {
    try {
      console.log('Login data:', data, 'Brand ID:', brandId);
      const res = await apiClient(
        dispatch,
        `founder/login/${brandId}`,
        'POST',
        {
          body: JSON.stringify(data),
        },
        source
      );
      return res;
    } catch (error) {
      console.log('Login error:', error);
      return rejectWithValue(error.message);
    }
  }
);
