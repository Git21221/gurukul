import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile_pic: {
      type: String,
      required: false,
    },
    ipv4_address: {
      type: String,
      required: true,
    },
    ipv6_address: {
      type: String,
      required: true,
    },
    platform_of_account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    certificate_count: {
      type: Number,
      default: 0,
    },
    certificates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Certificate",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
