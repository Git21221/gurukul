import { apiClient } from '@gurukul/shared-client';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createBrand = createAsyncThunk(
  'brand/createBrand',
  async ({ dispatch, data, source = 'main' }, { rejectWithValue }) => {
    try {
      const res = await apiClient(
        dispatch,
        'brand/create',
        'POST',
        {
          body: JSON.stringify(data),
        },
        source
      );
      return res;
    } catch (error) {
      console.log('Create brand error:', error);
      return rejectWithValue(error.message);
    }
  }
);
