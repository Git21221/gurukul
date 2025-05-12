import mongoose from "mongoose";

const videoMetaDataSchema = new mongoose.Schema(
  {
    duration: {
      type: Number,
    },
    video_size: {
      type: String,
    },
    video_type: {
      type: String,
    },
    codec_name: {
      type: String,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    coded_width: {
      type: Number,
    },
    coded_height: {
      type: Number,
    },
    aspect_ratio: {
      type: String,
    },
    frame_rate: {
      type: String,
    },
    bits_per_sample: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const VideoMetaData = mongoose.model(
  "VideoMetaData",
  videoMetaDataSchema
);
