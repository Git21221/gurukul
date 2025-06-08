import { configureStore } from "@reduxjs/toolkit";
import educatorSlice from "../redux/slices/educatorSlice.js";
import uiSlice from "../redux/slices/uiSlice.js";
import brandDetailsSlice from "../redux/slices/brandDetailsSlice.js";
import authSlice from "../redux/slices/authSlice.js";
import { logoutMiddleware } from "../redux/middlewares/logoutMiddleware.js";
import { loginMiddleware } from "../redux/middlewares/loginMiddleware.js";

export const store = configureStore({
  reducer: {
    educator: educatorSlice.reducer,
    ui: uiSlice.reducer,
    brandDetails: brandDetailsSlice.reducer,
    auth: authSlice.reducer, // Assuming authSlice is part of educatorSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logoutMiddleware, loginMiddleware),
});