import { Router } from "express";
import { createBrand } from "../controller/brand.controller.js";

export const brandRouter = Router();

brandRouter.post("/create", createBrand);
