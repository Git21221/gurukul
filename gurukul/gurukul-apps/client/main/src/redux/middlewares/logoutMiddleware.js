import { logout } from '../slices/authSlice';

export const logoutMiddleware = (store) => (next) => (action) => {
  console.log('Logout Middleware Triggered', action);
  if (
    action?.payload?.statusCode === 403 ||
    action?.payload?.statusCode === 401 ||
    action?.type === 'auth/verifyFounderToken/rejected' ||
    action?.type === 'auth/verifyFounderRole/rejected'
  ) {
    store.dispatch(logout());
  }
  return next(action);
};
