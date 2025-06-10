import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../redux/slices/authSlice';
import { loginMiddleware } from '../redux/middlewares/loginMiddleware';
import { logoutMiddleware } from '../redux/middlewares/logoutMiddleware';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logoutMiddleware, loginMiddleware),
});
