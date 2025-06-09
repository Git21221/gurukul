import { configureStore } from '@reduxjs/toolkit';
import authSlice from 'src/redux/slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logoutMiddleware, loginMiddleware),
});
