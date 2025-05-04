import { Router } from "express";
import { createBrand, getAllEducators } from "../controller/brand.controller.js";
import { verifyJWT } from "@gurukul/shared-server/middleware/verifyJWT.middleware.js";
import verifyROLE from "@gurukul/shared-server/middleware/verifyRole.middleware.js";

export const brandRouter = Router();

brandRouter.post("/create", verifyROLE, verifyJWT, createBrand);
brandRouter.get("/get-all-educators", verifyROLE, verifyJWT, getAllEducators);
