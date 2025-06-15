import { Router } from 'express';
import {
  createReferral,
  getReferralToken,
  loginFounder,
  verifyReferralToken,
  verifyRole,
  verifyToken,
} from '../controller/founder.controller.js';
import { verifyJWT, verifyROLE } from '@gurukul/shared-server';

export const founderRouter = Router();

founderRouter.route('/login/:brandId').post(loginFounder);
founderRouter
  .route('/create-referral/:brandId')
  .post(verifyROLE, verifyJWT, createReferral);
founderRouter
  .route('/get-referral')
  .post(verifyROLE, verifyJWT, getReferralToken);
founderRouter
  .route('/verify-referral-token/:brandId')
  .post(verifyReferralToken);
founderRouter.route('/verify-token').get(verifyToken);
founderRouter.route('/verify-role').get(verifyRole);
