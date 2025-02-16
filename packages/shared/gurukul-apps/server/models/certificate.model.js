import mongoose from "mongoose";

const CertificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    issued_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Founder",
    },
    belongs_to_course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    has_expiry: {
      type: Boolean,
      required: true,
      default: false,
    },
    expires_on: {
      type: Date,
      required: false,
    },
    link_of_certificate: {
      type: String,
      required: true,
      trim: true,
    },
    copyright: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
  },
  { timestamps: true }
);

export const Certificate = mongoose.model("Certificate", CertificateSchema);