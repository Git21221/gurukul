import { login } from '../slices/authSlice';

export const loginMiddleware = (store) => (next) => (action) => {
  console.log('Login Middleware Action:', action);
  if (
    action.type === 'auth/verifyFounderToken/fulfilled' &&
    action.type === 'auth/verifyFounderrRole/fulfilled'
  ) {
    if (action.payload.statusCode === 200) {
      store.dispatch(login(action));
    }
  }
  return next(action);
};
