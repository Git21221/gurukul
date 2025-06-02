import { Router } from "express";
import {
  createReferral,
  getReferralToken,
  loginFounder,
  registerFounder,
} from "../controller/founder.controller.js";
import { verifyJWT, verifyROLE } from "@gurukul/shared-server";

export const founderRoutes = Router();

founderRoutes.route("/register").post(registerFounder);
founderRoutes.route("/login").post(loginFounder);
founderRoutes
  .route("/create-referral/:brand_id")
  .post(verifyROLE, verifyJWT, createReferral);
founderRoutes
  .route("/get-referral")
  .get(verifyROLE, verifyJWT, getReferralToken);
