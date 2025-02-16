import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    progress_of_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course_attended: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    video_watch: [
      {
        video: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Video",
          required: true,
        },
        watch_time: {
          type: Number, // in seconds
          default: 0,
        },
        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],
    total_progress: {
      type: Number,
      default: 0, // in percentage
    },
    last_accessed: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Progress = mongoose.model("Progress", progressSchema);