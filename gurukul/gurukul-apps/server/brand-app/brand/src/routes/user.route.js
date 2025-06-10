import { Router } from 'express';
import {
  loginUser,
  registerUser,
  verifyRole,
  verifyToken,
} from '../controller/user.controller.js';

export const userRouter = Router();
userRouter.post('/register/:brandId', registerUser);
userRouter.post('/login/:brandId', loginUser);
userRouter.get('/verify-token', verifyToken);
userRouter.get('/verify-role', verifyRole);
