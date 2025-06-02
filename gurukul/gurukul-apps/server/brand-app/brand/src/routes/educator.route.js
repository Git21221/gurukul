import { Router } from "express";
import { loginEducator, registerEducator } from "../controller/educator.controller.js";

export const educatorRouter = Router();

educatorRouter.post("/register", registerEducator);
educatorRouter.post("/login/:brandId", loginEducator);