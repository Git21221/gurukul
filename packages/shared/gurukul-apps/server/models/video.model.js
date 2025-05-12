import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 100,
      minLength: 5,
    },
    key: {
      type: String,
      required: true,
      unique: true,
    },
    object_url: {
      type: String,
      required: true,
    },
    etag: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      maxLength: 5000,
      minLength: 5,
    },
    total_views: {
      type: Number,
      default: 0,
    },
    uploaded_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Founder",
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Educator",
    },
    uploaded_to_courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    uploaded_to_brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    video_url: {
      type: String,
      required: true,
    },
    video_metadata: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VideoMetaData",
    },
    audio_metadata: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AudioMetaData",
    },
  },
  {
    timestamps: true,
  }
);

export const Video = mongoose.model("Video", videoSchema);
