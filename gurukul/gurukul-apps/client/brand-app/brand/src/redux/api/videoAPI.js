import { apiClient } from '@gurukul/shared-client';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const uploadVideo = createAsyncThunk(
  'video/uploadVideo',
  async (
    { dispatch, data, brandId, source = 'brand' },
    { rejectWithValue }
  ) => {
    try {
      console.log('Upload Video data:', data);
      const res = await apiClient(
        dispatch,
        `video/upload/${brandId}`,
        'POST',
        {
          body: data,
        },
        source
      );
      return res;
    } catch (error) {
      console.log('Upload Video error:', error);
      return rejectWithValue(error.message);
    }
  }
);
