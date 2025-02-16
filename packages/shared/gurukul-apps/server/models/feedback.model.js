import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    written_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    stars: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    feedback_text: {
      type: String,
      required: true,
      maxLength: 5000,
      minLength: 5,
    },
    given_on_course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    given_on_brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    given_on_educator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Educator",
    },
    given_on_mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentor",
    },
    given_on_founder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Founder",
    },
    is_anonymous: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Feedback = mongoose.model("Feedback", feedbackSchema);
