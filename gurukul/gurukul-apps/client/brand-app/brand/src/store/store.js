import { configureStore } from '@reduxjs/toolkit';
import educatorSlice from '../redux/slices/educatorSlice.js';
import uiSlice from '../redux/slices/uiSlice.js';
import brandDetailsSlice from '../redux/slices/brandDetailsSlice.js';
import authSlice from '../redux/slices/authSlice.js';
import { logoutMiddleware } from '../redux/middlewares/logoutMiddleware.js';
import { loginMiddleware } from '../redux/middlewares/loginMiddleware.js';
import founderSlice from '../redux/slices/founderSlice.js';
import userSlice from '../redux/slices/userSlice.js';
import playlistSlice from '../redux/slices/playlistSlice.js';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    brandDetails: brandDetailsSlice.reducer,
    educator: educatorSlice.reducer,
    founder: founderSlice.reducer,
    ui: uiSlice.reducer,
    user: userSlice.reducer,
    playlist: playlistSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logoutMiddleware, loginMiddleware),
});
