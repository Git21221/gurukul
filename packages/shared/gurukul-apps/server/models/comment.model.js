import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    commented_by_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    commented_by_educator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Educator",
    },
    commented_by_founder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Founder",
    },
    commented_on_video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
    commented_on_article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
    },
  },
  {
    timestamps: true,
  }
);

export const Comment = mongoose.model("Comment", commentSchema);
