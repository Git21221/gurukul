import { apiClient } from '@gurukul/shared-client';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const registerEducator = createAsyncThunk(
  'educator/register',
  async ({ dispatch, data, token, source = 'brand' }, { rejectWithValue }) => {
    try {
      return await apiClient(
        dispatch,
        `educator/register?token=${token}`,
        'POST',
        {
          body: JSON.stringify(data),
        },
        source
      );
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginEducator = createAsyncThunk(
  'educator/login',
  async (
    { dispatch, data, brandId, source = 'brand' },
    { rejectWithValue }
  ) => {
    try {
      console.log('Login data:', data, 'Brand ID:', brandId);
      const res = await apiClient(
        dispatch,
        `educator/login/${brandId}`,
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
