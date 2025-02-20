import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema(
  {
    established_by: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Founder",
      },
    ],
    name: {
      type: String,
      required: true,
      trim: true,
    },
    base_url: {
      type: String,
      required: true,
      trim: true,
    },
    logo: { 
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Brand = mongoose.model("Brand", BrandSchema);
