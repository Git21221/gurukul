import mongoose from "mongoose";

const brandViewSchema = new mongoose.Schema(
  {
    brand_view: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    watch_by_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    watch_by_edu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Educator",
    },
  },
  {
    timestamps: true,
  }
);

export const BrandView = mongoose.model("BrandView", brandViewSchema);
