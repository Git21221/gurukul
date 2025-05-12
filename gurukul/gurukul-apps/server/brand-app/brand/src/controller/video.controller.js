import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  asyncFuncHandler,
  AudioMetaData,
  Brand,
  error,
  Founder,
  getVideoMetaData,
  success,
  verifyBrandWithUser,
  Video,
  VideoMetaData,
} from "@gurukul/shared-server";
import { roles, statusCodes } from "../../../../config/constants.js";
import env from "../../../../../../../env.js";

const s3 = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY,
    secretAccessKey: env.AWS_SECRET_KEY,
  },
});

const uploadVideo = asyncFuncHandler(async (req, res) => {
  const role = req.role;
  if (role !== roles.EDUCATOR && role !== roles.FOUNDER) {
    return error(
      statusCodes.UNAUTHORIZED,
      "Unauthorized access, restricted to educator and founder only"
    )(res);
  }
  const brandId = req.params.brandId;
  if (!brandId) {
    return error(statusCodes.BAD_REQUEST, "Brand ID is required")(res);
  }
  // Check if the brandId is valid for this user
  const isAuthorised = await verifyBrandWithUser(role, brandId, req.user._id);
  if (!isAuthorised) {
    return error(
      statusCodes.UNAUTHORIZED,
      "Unauthorized access, you are not associated with this brand"
    )(res);
  }
  const BrandDetails = await Brand.findById(brandId, {
    established_by: 1,
    name: 1,
  });
  if (!BrandDetails) {
    return error(statusCodes.NOT_FOUND, "Brand not found")(res);
  }
  const founderName = await Founder.findById(BrandDetails.established_by, {
    fullName: 1,
  });
  const brandName = BrandDetails.name;
  const videoFile = req.file;
  const { title, description } = req.body;
  if (!videoFile) {
    return error(statusCodes.BAD_REQUEST, "No video file uploaded")(res);
  }
  if (!title) {
    return error(statusCodes.BAD_REQUEST, "Title is required")(res);
  }
  console.log("Video file details:", videoFile);
  const { originalname, mimetype, buffer, size } = videoFile;
  const fileName = `${Date.now()}-${originalname}`;
  const filePath = `videos-${brandName}-${founderName.fullName}/${fileName}`;
  const videoUrl = `https://${env.AWS_BUCKET_NAME}.s3.${env.AWS_REGION}.amazonaws.com/${filePath}`;

  const command = new PutObjectCommand({
    Bucket: env.AWS_BUCKET_NAME,
    Key: filePath,
    Body: buffer,
    ContentType: mimetype,
  });
  const uploadToAwsS3 = await s3.send(command);
  console.log("Upload to S3 response:", uploadToAwsS3);
  if (uploadToAwsS3.$metadata.httpStatusCode !== 200) {
    return error(
      statusCodes.INTERNAL_SERVER_ERROR,
      "Failed to upload video to S3"
    )(res);
  }
  const object_url = `https://${env.AWS_BUCKET_NAME}.s3.${env.AWS_REGION}.amazonaws.com/${filePath}`;
  const video_type = mimetype;
  const video_size = `${(size / (1024 * 1024)).toFixed(2)} MB`;
  const { duration, metadata } = await getVideoMetaData(buffer, originalname);
  const etag = uploadToAwsS3.ETag;
  // video metadata
  const codec_name = metadata?.streams[0].codec_name || "Unknown";
  const width = metadata?.streams[0].width;
  const height = metadata?.streams[0].height;
  const coded_width = metadata?.streams[0].coded_width || width;
  const coded_height = metadata?.streams[0].coded_height || height;
  const aspect_ratio = metadata?.streams[0].aspect_ratio || "16:9";
  const frame_rate = metadata?.streams[0].avg_frame_rate.split("/")[0] || 30;
  const bits_per_sample = metadata?.streams[0].bits_per_raw_sample || 8;

  //audio metadata
  const audio_codec_name = metadata?.streams[1].codec_name || "Unknown";
  const sample_rate = metadata?.streams[1].sample_rate || 44100;
  const profile = metadata?.streams[1].profile || "Unknown";
  const channels = metadata?.streams[1].channels || 2;
  const channel_layout = metadata?.streams[1].channel_layout || "stereo";
  //save the video details to the database
  const videoData = {
    title,
    key: filePath,
    object_url,
    etag,
    description,
    video_url: videoUrl,
    belongs_to_brand: brandId,
  };
  if (role === roles.EDUCATOR) {
    videoData.uploaded_by_educator = req.user._id;
  }
  if (role === roles.FOUNDER) {
    videoData.uploaded_by_founder = req.user._id;
  }
  const videoMetaData = {
    duration,
    video_size,
    video_type,
    codec_name,
    width,
    height,
    coded_width,
    coded_height,
    aspect_ratio,
    frame_rate,
    bits_per_sample,
  };
  const videoMetaDataId = await VideoMetaData.create(videoMetaData);
  if (!videoMetaDataId) {
    return error(
      statusCodes.INTERNAL_SERVER_ERROR,
      "Failed to save video metadata"
    )(res);
  }
  videoData.video_metadata = videoMetaDataId._id;
  const audioMetaData = {
    codec_name: audio_codec_name,
    sample_rate,
    channels,
    channel_layout,
    profile,
  };
  const audioMetaDataId = await AudioMetaData.create(audioMetaData);
  if (!audioMetaDataId) {
    return error(
      statusCodes.INTERNAL_SERVER_ERROR,
      "Failed to save audio metadata"
    )(res);
  }
  videoData.audio_metadata = audioMetaDataId._id;
  console.log("Video data to be saved:", videoData);
  const video = await Video.create(videoData);
  return success(statusCodes.OK, "Video uploaded successfully", video)(res);
});

export { uploadVideo };
