import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

export const Brand = mongoose.model("Brand", BrandSchema);