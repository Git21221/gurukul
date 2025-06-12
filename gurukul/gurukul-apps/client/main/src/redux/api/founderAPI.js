import { apiClient } from '@gurukul/shared-client';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const registerFounder = createAsyncThunk(
  'founder/register',
  async ({ dispatch, data, source = 'main' }, { rejectWithValue }) => {
    try {
      const res = await apiClient(
        dispatch,
        'founder/register',
        'POST',
        {
          body: JSON.stringify(data),
        },
        source
      );
      return res;
    } catch (error) {
      console.log('Create founder error:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const loginFounder = createAsyncThunk(
  'founder/login',
  async ({ dispatch, data, source = 'main' }, { rejectWithValue }) => {
    try {
      const res = await apiClient(
        dispatch,
        'founder/login',
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
