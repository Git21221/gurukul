import mongoose from "mongoose";

const educatorSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile_picture: {
      type: String,
      required: false,
    },
    designation: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    worked_at: {
      type: [String],
      required: false,
    },
    refered_by_founder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Founder",
    },
    belongs_to_brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    belongs_to_courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Educator = mongoose.model("Educator", educatorSchema);
