import { Router } from "express";
import { registerEducator } from "../controller/educator.controller.js";

export const educatorRouter = Router();

educatorRouter.post("/register", registerEducator);
// educatorRouter.post("/login", );