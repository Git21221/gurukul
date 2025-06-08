import { Router } from "express";
import { loginEducator, registerEducator, verifyRole, verifyToken } from "../controller/educator.controller.js";
import { verifyJWT, verifyROLE } from "@gurukul/shared-server";

export const educatorRouter = Router();

educatorRouter.post("/register", registerEducator);
educatorRouter.post("/login/:brandId", loginEducator);
educatorRouter.get("/verify-token", verifyToken);
educatorRouter.get("/verify-role", verifyRole);