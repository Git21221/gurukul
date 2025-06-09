import { login } from '../slices/authSlice';

export const loginMiddleware = (store) => (next) => (action) => {
  console.log('Login Middleware Action:', action);
  if (
    (action.type === 'auth/verifyEducatorToken/fulfilled' &&
      action.type === 'auth/verifyEducatorRole/fulfilled') ||
    (action.type === 'auth/verifyFounderToken/fulfilled' &&
      action.type === 'auth/verifyFounderRole/fulfilled') ||
    (action.type === 'auth/verifyUserToken/fulfilled' &&
      action.type === 'auth/verifyUserRole/fulfilled')
  ) {
    if (action.payload.statusCode === 200) {
      store.dispatch(login(action));
    }
  }
  return next(action);
};
