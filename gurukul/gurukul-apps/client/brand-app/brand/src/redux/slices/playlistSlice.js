import { createSlice } from '@reduxjs/toolkit';
import {
  addVideosToPlayList,
  createPlaylist,
  deleteVideosFromPlayList,
} from '../api/playlistAPI';

const initialState = {
  playlists: [],
  loading: false,
  error: null,
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    resetPlaylists: (state) => {
      state.playlists = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlists.push(action.payload.data);
      })
      .addCase(createPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addVideosToPlayList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addVideosToPlayList.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPlaylist = state.playlists.find(
          (playlist) => playlist.id === action.payload.data._id
        );
        if (updatedPlaylist) {
          updatedPlaylist.videos = action.payload.data.videos;
        }
      })
      .addCase(addVideosToPlayList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteVideosFromPlayList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVideosFromPlayList.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPlaylist = state.playlists.find(
          (playlist) => playlist.id === action.payload.data._id
        );
        if (updatedPlaylist) {
          updatedPlaylist.videos = action.payload.data.videos;
        }
      })
      .addCase(deleteVideosFromPlayList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPlaylists } = playlistSlice.actions;
export default playlistSlice;
