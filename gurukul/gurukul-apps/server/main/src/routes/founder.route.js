import { Router } from "express";
import { loginFounder, registerFounder } from "../controller/founder.controller.js";

export const founderRoutes = Router();

founderRoutes.route("/register").post(registerFounder);
founderRoutes.route("/login").post(loginFounder);