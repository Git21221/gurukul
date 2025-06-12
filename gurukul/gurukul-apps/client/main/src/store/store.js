import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../redux/slices/authSlice';
import { loginMiddleware } from '../redux/middlewares/loginMiddleware';
import { logoutMiddleware } from '../redux/middlewares/logoutMiddleware';
import founderSlice from '../redux/slices/founderSlice';
import brandSlice from '../redux/slices/brandSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    founder: founderSlice.reducer,
    brand: brandSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logoutMiddleware, loginMiddleware),
});
