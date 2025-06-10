import { Router } from 'express';
import {
  loginFounder,
  verifyRole,
  verifyToken,
} from '../controller/founder.controller.js';

export const founderRouter = Router();

founderRouter.route('/login/:brandId').post(loginFounder);
founderRouter.route('/verify-token').get(verifyToken);
founderRouter.route('/verify-role').get(verifyRole);
