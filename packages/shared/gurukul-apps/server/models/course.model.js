import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    course_name: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 50,
    },
    price: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Price",
        required: true,
      },
    ],
    total_video_duration: {
      type: Number,
      required: true,
      default: 0,
    },
    total_article: {
      type: Number,
      required: true,
      default: 0,
    },
    total_downloadable_resource: {
      type: Number,
      required: true,
    },
    belongs_to_brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    educators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Educator",
      },
    ],
    mentors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mentor",
      },
    ],
    videos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    table_of_contents: {
      type: [String],
      required: true,
    },
    avg_star: {
      type: Number,
      default: 0,
    },
    created_by_founder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Founder",
    },
    created_by_educator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Educator",
    },
  },
  {
    timestamps: true,
  }
);

export const Course = mongoose.model("Course", courseSchema);
