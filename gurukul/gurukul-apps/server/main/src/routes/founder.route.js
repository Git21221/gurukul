import { Router } from 'express';
import {
  createReferral,
  getReferralToken,
  loginFounder,
  registerFounder,
  verifyRole,
  verifyToken,
} from '../controller/founder.controller.js';
import { verifyJWT, verifyROLE } from '@gurukul/shared-server';

export const founderRoutes = Router();

founderRoutes.route('/register').post(registerFounder);
founderRoutes.route('/login').post(loginFounder);
founderRoutes
  .route('/create-referral/:brand_id')
  .post(verifyROLE, verifyJWT, createReferral);
founderRoutes
  .route('/get-referral')
  .get(verifyROLE, verifyJWT, getReferralToken);
founderRoutes.route('/verify-token').get(verifyToken);
founderRoutes.route('/verify-role').get(verifyRole);
