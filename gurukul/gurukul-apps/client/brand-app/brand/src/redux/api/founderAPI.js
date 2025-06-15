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

export const createReferral = createAsyncThunk(
  'founder/createReferral',
  async (
    { dispatch, data, brandId, source = 'brand' },
    { rejectWithValue }
  ) => {
    try {
      console.log('Create Referral data:', data, 'Brand ID:', brandId);
      const res = await apiClient(
        dispatch,
        `founder/create-referral/${brandId}?minLength=6&maxLength=10`,
        'POST',
        {
          body: JSON.stringify(data),
        },
        source
      );
      return res;
    } catch (error) {
      console.log('Create Referral error:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const getReferral = createAsyncThunk(
  'founder/getReferral',
  async (
    { dispatch, data, brandId, source = 'brand' },
    { rejectWithValue }
  ) => {
    try {
      console.log('Get Referral data:', data, 'Brand ID:', brandId);
      const res = await apiClient(
        dispatch,
        `founder/get-referral`,
        'POST',
        {
          body: JSON.stringify(data),
        },
        source
      );
      return res;
    } catch (error) {
      console.log('Get Referral error:', error);
      return rejectWithValue(error.message);
    }
  }
);
