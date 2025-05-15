import { Router } from "express";
import {
  addVideosToPlaylist,
  createPlaylist,
  removeVideosFromPlaylist,
} from "../controller/playlist.controller.js";
import { verifyJWT, verifyROLE } from "@gurukul/shared-server";

export const playlistRouter = Router();

playlistRouter.post("/create/:brandId", verifyROLE, verifyJWT, createPlaylist);
playlistRouter.put(
  "/add-video/:brandId/:playlistId",
  verifyROLE,
  verifyJWT,
  addVideosToPlaylist
);
playlistRouter.delete(
  "/remove-video/:brandId/:playlistId",
  verifyROLE,
  verifyJWT,
  removeVideosFromPlaylist
);
