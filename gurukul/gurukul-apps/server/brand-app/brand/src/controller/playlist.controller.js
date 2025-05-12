import {
  asyncFuncHandler,
  Brand,
  Educator,
  Playlist,
  verifyBrandWithUser,
} from "@gurukul/shared-server";
import {
  error,
  success,
} from "@gurukul/shared-server/utils/formattedReturns.js";
import { roles, statusCodes } from "../../../../config/constants.js";
import mongoose from "mongoose";

const createPlaylist = asyncFuncHandler(async (req, res) => {
  const role = req?.role;
  if (role !== roles.EDUCATOR && role !== roles.FOUNDER) {
    return error(
      statusCodes.UNAUTHORIZED,
      "Unauthorized access, restricted to educator and founder only"
    )(res);
  }
  const { name, description, videos } = req?.body;
  const { brandId } = req?.params;
  //check if brandId is valid for this user
  const isAuthorised = await verifyBrandWithUser(
    role,
    brandId,
    req.user._id
  );
  if (!isAuthorised) {
    return error(
      statusCodes.UNAUTHORIZED,
      "Unauthorized access, you are not associated with this brand"
    )(res);
  }
  //sanitize data from frontend
  if (!name) {
    return error(statusCodes.BAD_REQUEST, "Missing required fields")(res);
  }
  //check for existed playlist
  const existedPlaylist = await Playlist.find(
    { name, belongs_to_brand: brandId },
    { new: true }
  );
  if (existedPlaylist.length !== 0) {
    return error(
      statusCodes.BAD_REQUEST,
      "Playlist already exists for this name on this brand"
    )(res);
  }
  //create new playlist
  const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

  const playlistData = {
    name,
    description,
    videos: (videos || [])
      .filter((video) => isValidObjectId(video))
      .map((video) => new mongoose.Types.ObjectId(video)),
    belongs_to_brand: new mongoose.Types.ObjectId(brandId),
  };

  if (role === roles.EDUCATOR) {
    playlistData.created_by_educator = req.user._id;
  }
  
  if (role === roles.FOUNDER) {
    playlistData.created_by_founder = req.user._id;
  }
  console.log(playlistData);

  const playlist = await Playlist.create(playlistData);
  if (!playlist) {
    return error(
      statusCodes.INTERNAL_SERVER_ERROR,
      "Failed to create playlist for some unknown reason"
    )(res);
  }
  return success(
    statusCodes.CREATED,
    "Playlist created successfully",
    playlist
  )(res);
});

export { createPlaylist };
