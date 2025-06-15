import { apiClient } from '@gurukul/shared-client';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createPlaylist = createAsyncThunk(
  'playlist/createPlaylist',
  async (
    { dispatch, data, brandId, source = 'brand' },
    { rejectWithValue }
  ) => {
    try {
      console.log('Create Playlist data:', data);
      const res = await apiClient(
        dispatch,
        `playlist/create/${brandId}`,
        'POST',
        {
          body: JSON.stringify(data),
        },
        source
      );
      return res;
    } catch (error) {
      console.log('Create Playlist error:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const addVideosToPlayList = createAsyncThunk(
  'playlist/addVideosToPlayList',
  async (
    { dispatch, data, brandId, playlistId, source = 'brand' },
    { rejectWithValue }
  ) => {
    try {
      console.log('Add Videos to Playlist data:', data);
      const res = await apiClient(
        dispatch,
        `playlist/add-video/${brandId}/${playlistId}`,
        'PUT',
        {
          body: JSON.stringify(data),
        },
        source
      );
      return res;
    } catch (error) {
      console.log('Add Videos to Playlist error:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteVideosFromPlayList = createAsyncThunk(
  'playlist/deleteVideosFromPlayList',
  async (
    { dispatch, data, brandId, source = 'brand' },
    { rejectWithValue }
  ) => {
    try {
      console.log('Delete Videos from Playlist data:', data);
      const res = await apiClient(
        dispatch,
        `playlist/remove-video/${brandId}`,
        'PUT',
        {
          body: JSON.stringify(data),
        },
        source
      );
      return res;
    } catch (error) {
      console.log('Delete Videos from Playlist error:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const getAllPlaylistOfBrand = createAsyncThunk(
  'playlist/getAllPlaylistOfBrand',
  async ({ dispatch, brandId, source = 'brand' }, { rejectWithValue }) => {
    try {
      console.log('Get All Playlist of Brand for Brand ID:', brandId);
      const res = await apiClient(
        dispatch,
        `playlist/get-playlist/${brandId}`,
        'GET',
        {},
        source
      );
      return res;
    } catch (error) {
      console.log('Get All Playlist of Brand error:', error);
      return rejectWithValue(error.message);
    }
  }
);
