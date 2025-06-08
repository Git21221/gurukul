import { logout } from '../slices/authSlice';

export const logoutMiddleware = (store) => (next) => (action) => {
  console.log('Logout Middleware Triggered', action);
  if (
    action?.payload?.statusCode === 403 ||
    action?.payload?.statusCode === 401 ||
    action?.type === 'auth/verifyEducatorToken/rejected' ||
    action?.type === 'auth/verifyAdminToken/rejected' ||
    action.type === 'auth/verifyUserToken/rejected' ||
    action.type === 'auth/verifyUserRole/rejected' ||
    action.type === 'auth/verifyEducatorRole/rejected'
  ) {
    store.dispatch(logout());
  }
  return next(action);
};
