import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    videos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    created_by_educator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Educator",
    },
    created_by_founder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Founder",
    },
  },
  {
    timestamps: true,
  }
);

export const Playlist = mongoose.model("Playlist", playlistSchema);
