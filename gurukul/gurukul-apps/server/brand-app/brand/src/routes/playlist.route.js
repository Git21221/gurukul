import { Router } from "express";
import { createPlaylist } from "../controller/playlist.controller.js";
import { verifyJWT, verifyROLE } from "@gurukul/shared-server";

export const playlistRouter = Router();


playlistRouter.post("/create/:brandId", verifyROLE, verifyJWT, createPlaylist);