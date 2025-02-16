import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      maxLength: 5000,
      minLength: 5,
    },
    created_by_educator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Educator",
    },
    created_by_founder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Founder",
    },
    created_by_mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentor",
    },
    title: {
      type: String,
      required: true,
      maxLength: 100,
      minLength: 5,
    },
    tags: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Article = mongoose.model("Article", articleSchema);
