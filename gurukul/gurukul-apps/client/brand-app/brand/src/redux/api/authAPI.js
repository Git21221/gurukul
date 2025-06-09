import { apiClient } from '@gurukul/shared-client';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const verifyEducatorToken = createAsyncThunk(
  'auth/verifyEducatorToken',
  async ({ dispatch, source = 'brand' }, { rejectWithValue }) => {
    console.log('Verifying educator token...');
    try {
      const res = await apiClient(
        dispatch,
        'educator/verify-token',
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

export const verifyEducatorRole = createAsyncThunk(
  'auth/verifyEducatorRole',
  async ({ dispatch, source = 'brand' }, { rejectWithValue }) => {
    try {
      const res = await apiClient(
        dispatch,
        'educator/verify-role',
        'GET',
        {},
        source
      );
      console.log('verifyEducatorRole response:', res);

      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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

export const verifyUserToken = createAsyncThunk(
  'auth/verifyUserToken',
  async ({ dispatch, source = 'brand' }, { rejectWithValue }) => {
    try {
      const res = await apiClient(
        dispatch,
        'user/verify-token',
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

export const verifyUserRole = createAsyncThunk(
  'auth/verifyUserRole',
  async ({ dispatch, source = 'brand' }, { rejectWithValue }) => {
    try {
      const res = await apiClient(
        dispatch,
        'user/verify-role',
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
