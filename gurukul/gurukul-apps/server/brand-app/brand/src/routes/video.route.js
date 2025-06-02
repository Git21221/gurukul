import { upload, verifyJWT, verifyROLE } from "@gurukul/shared-server";
import { Router } from "express";
import { getSingleVideo, uploadVideo } from "../controller/video.controller.js";

export const videoRouter = Router();
videoRouter.post("/upload/:brandId", upload.single("video"), verifyROLE, verifyJWT, uploadVideo);
videoRouter.get("/get-single-video/:videoId/:brandId", verifyROLE, verifyJWT, getSingleVideo);