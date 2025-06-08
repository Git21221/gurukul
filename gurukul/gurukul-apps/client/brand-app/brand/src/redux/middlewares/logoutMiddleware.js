import { logout } from "../slices/authSlice";

export const logoutMiddleware = (store) => (next) => (action) => {
  if (action?.payload?.statusCode === 403 || action?.payload?.statusCode === 401 || action?.type === "auth/verifyEducatorToken/rejected" || action?.type === "auth/verifyAdminToken/rejected" || action.type === "auth/verifyUserToken/rejected") {
    store.dispatch(logout());
  }
  return next(action);
};