import { Router } from 'express';
import { registerUser } from '../controller/user.controller.js';

export const userRouter = Router();
userRouter.post('/register/:brandId', registerUser);
