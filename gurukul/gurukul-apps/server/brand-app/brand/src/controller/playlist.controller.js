import {
  asyncFuncHandler,
  Playlist,
  verifyBrandWithUser,
  Video,
} from '@gurukul/shared-server';
import {
  error,
  success,
} from '@gurukul/shared-server/utils/formattedReturns.js';
import { roles, statusCodes } from '../../../../config/constants.js';
import mongoose from 'mongoose';

const createPlaylist = asyncFuncHandler(async (req, res) => {
  const role = req?.role;
  if (role !== roles.EDUCATOR && role !== roles.FOUNDER) {
    return error(
      statusCodes.UNAUTHORIZED,
      'Unauthorized access, restricted to educator and founder only'
    )(res);
  }
  const { name, description, videos } = req?.body;
  const { brandId } = req?.params;
  //check if brandId is valid for this user
  const isAuthorised = await verifyBrandWithUser(role, brandId, req.user._id);
  if (!isAuthorised) {
    return error(
      statusCodes.UNAUTHORIZED,
      'Unauthorized access, you are not associated with this brand'
    )(res);
  }
  //sanitize data from frontend
  if (!name) {
    return error(statusCodes.BAD_REQUEST, 'Missing required fields')(res);
  }
  //check for existed playlist
  const existedPlaylist = await Playlist.find(
    { name, belongs_to_brand: brandId },
    { new: true }
  );
  if (existedPlaylist.length !== 0) {
    return error(
      statusCodes.BAD_REQUEST,
      'Playlist already exists for this name on this brand'
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
      'Failed to create playlist for some unknown reason'
    )(res);
  }
  return success(
    statusCodes.CREATED,
    'Playlist created successfully',
    playlist
  )(res);
});

const addVideosToPlaylist = asyncFuncHandler(async (req, res) => {
  const role = req?.role;
  if (role !== roles.EDUCATOR && role !== roles.FOUNDER) {
    return error(
      statusCodes.UNAUTHORIZED,
      'Unauthorized access, restricted to educator and founder only'
    )(res);
  }
  const { playlistId, brandId } = req.params;
  if (!playlistId || !brandId) {
    return error(statusCodes.BAD_REQUEST, 'Missing required fields')(res);
  }
  const isAuthorised = await verifyBrandWithUser(role, brandId, req.user._id);
  if (!isAuthorised) {
    return error(
      statusCodes.UNAUTHORIZED,
      'Unauthorized access, you are not associated with this brand'
    )(res);
  }
  //check if playlist exists
  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    return error(statusCodes.NOT_FOUND, 'Playlist not found')(res);
  }
  //check if videos are valid
  const { videos } = req.body;
  if (!videos) {
    return error(statusCodes.BAD_REQUEST, 'videos required')(res);
  }
  if (!Array.isArray(videos) && videos.length === 0) {
    return error(statusCodes.BAD_REQUEST, 'No videos provided')(res);
  }
  const videoObjectIds = videos.map((id) => new mongoose.Types.ObjectId(id));
  const videosToAdd = await Video.find(
    { _id: { $in: videoObjectIds } },
    { new: true }
  );
  if (videosToAdd.length === 0) {
    return error(statusCodes.NOT_FOUND, 'No videos found')(res);
  }
  //check if videos are already in playlist
  const existingIds = new Set(playlist.videos.map((video) => video.toString()));

  const videosToAddIds = videosToAdd
    .map((video) => video._id)
    .filter((id) => !existingIds.has(id.toString()));
  if (videosToAddIds.length === 0) {
    return error(statusCodes.BAD_REQUEST, 'Videos already in playlist')(res);
  }
  playlist.videos.push(...videosToAddIds);
  await playlist.save();
  return success(
    statusCodes.OK,
    'Videos added to playlist successfully',
    playlist
  )(res);
});

const removeVideosFromPlaylist = asyncFuncHandler(async (req, res) => {
  const role = req?.role;
  if (role !== roles.EDUCATOR && role !== roles.FOUNDER) {
    return error(
      statusCodes.UNAUTHORIZED,
      'Unauthorized access, restricted to educator and founder only'
    )(res);
  }
  const { playlistId, brandId } = req.params;
  const isAuthorised = await verifyBrandWithUser(role, brandId, req.user._id);
  if (!isAuthorised) {
    return error(
      statusCodes.UNAUTHORIZED,
      'Unauthorized access, you are not associated with this brand'
    )(res);
  }
  if (!playlistId || !brandId) {
    return error(statusCodes.BAD_REQUEST, 'Missing required fields')(res);
  }
  //check if playlist exists
  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    return error(statusCodes.NOT_FOUND, 'Playlist not found')(res);
  }
  //check if videos are valid
  const { videos } = req.body;
  if (!videos) {
    return error(statusCodes.BAD_REQUEST, 'videos required')(res);
  }
  if (!Array.isArray(videos) && videos?.length === 0) {
    return error(statusCodes.BAD_REQUEST, 'No videos provided')(res);
  }
  const videoObjectIds = videos.map((id) => new mongoose.Types.ObjectId(id));
  const videosToRemove = await Video.find(
    { _id: { $in: videoObjectIds } },
    { new: true }
  );
  if (videosToRemove.length === 0) {
    return error(statusCodes.NOT_FOUND, 'No videos found')(res);
  }
  //check if videos are already in playlist
  const existingIds = new Set(playlist.videos.map((video) => video.toString()));
  const videosToRemoveIds = videosToRemove
    .map((video) => video._id)
    .filter((id) => existingIds.has(id.toString()));

  if (videosToRemoveIds.length === 0) {
    return error(statusCodes.BAD_REQUEST, 'Videos not in playlist')(res);
  }

  const removeSet = new Set(videosToRemoveIds.map((id) => id.toString()));

  playlist.videos = playlist.videos.filter(
    (video) => !removeSet.has(video.toString())
  );

  await playlist.save();

  return success(
    statusCodes.OK,
    'Videos removed from playlist successfully',
    playlist
  )(res);
});

const getAllPlaylistOfBrand = asyncFuncHandler(async (req, res) => {
  const role = req?.role;
  // if (role !== roles.EDUCATOR && role !== roles.FOUNDER) {
  //   return error(
  //     statusCodes.UNAUTHORIZED,
  //     'Unauthorized access, restricted to educator and founder only'
  //   )(res);
  // }
  const { brandId } = req?.params;
  //check if brandId is valid for this user
  const isAuthorised = await verifyBrandWithUser(role, brandId, req.user._id);
  if (!isAuthorised) {
    return error(
      statusCodes.UNAUTHORIZED,
      'Unauthorized access, you are not associated with this brand'
    )(res);
  }
  //get all playlists of brand
  const playlists = await Playlist.find({ belongs_to_brand: brandId })
    .populate('videos')
    .sort({ createdAt: -1 });
  if (!playlists || playlists.length === 0) {
    return success(statusCodes.OK, 'No playlists found', [])(res);
  }
  return success(
    statusCodes.OK,
    'Playlists fetched successfully',
    playlists
  )(res);
});

const getSinglePlaylist = asyncFuncHandler(async (req, res) => {
  const { playlistId, brandId } = req.params;
  if (!brandId) {
    return error(statusCodes.BAD_REQUEST, 'Brand ID is required')(res);
  }
  const isAuthorised = await verifyBrandWithUser(
    req.role,
    brandId,
    req.user._id
  );
  if (!isAuthorised) {
    return error(
      statusCodes.UNAUTHORIZED,
      'Unauthorized access, you are not associated with this brand'
    )(res);
  }
  if (!playlistId) {
    return error(statusCodes.BAD_REQUEST, 'Playlist ID is required')(res);
  }
  const playlist = await Playlist.findById(playlistId).populate('videos');
  if (!playlist) {
    return error(statusCodes.NOT_FOUND, 'Playlist not found')(res);
  }
  return success(
    statusCodes.OK,
    'Playlist fetched successfully',
    playlist
  )(res);
});

export {
  createPlaylist,
  addVideosToPlaylist,
  removeVideosFromPlaylist,
  getAllPlaylistOfBrand,
  getSinglePlaylist,
};
