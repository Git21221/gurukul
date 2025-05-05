import { Router } from "express";
import {
  createReferral,
  getReferralToken,
  loginFounder,
  registerFounder,
} from "../controller/founder.controller.js";
import verifyROLE from "@gurukul/shared-server/middleware/verifyRole.middleware.js";
import { verifyJWT } from "@gurukul/shared-server/middleware/verifyJWT.middleware.js";

export const founderRoutes = Router();

founderRoutes.route("/register").post(registerFounder);
founderRoutes.route("/login").post(loginFounder);
founderRoutes
  .route("/create-referral/:brand_id")
  .post(verifyROLE, verifyJWT, createReferral);
founderRoutes
  .route("/get-referral")
  .get(verifyROLE, verifyJWT, getReferralToken);
