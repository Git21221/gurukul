import { Router } from 'express';
import {
  createBrand,
  getAllEducatorsOfAllBrandsBelongsToFounder,
  uploadBrandLogo,
} from '../controller/brand.controller.js';
import { verifyJWT, verifyROLE } from '@gurukul/shared-server';

export const brandRouter = Router();

brandRouter.post('/create', verifyROLE, verifyJWT, createBrand);
brandRouter.get(
  '/get-all-educators',
  verifyROLE,
  verifyJWT,
  getAllEducatorsOfAllBrandsBelongsToFounder
);
brandRouter.post('/upload/logo', verifyROLE, verifyJWT, uploadBrandLogo);
