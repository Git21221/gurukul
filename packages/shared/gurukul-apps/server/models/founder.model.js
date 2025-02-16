import mongoose from "mongoose";

const FounderSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  emailId: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  area_of_expertise: {
    type: String,
    required: false,
    trim: true,
    enum: ["Marketing", "Finance", "Operations", "Technology", "Sales"],
  },
  years_of_experience: {
    type: Number,
    required: false,
    trim: true,
  },
  profile_picture: {
    type: String,
    required: false,
    trim: true,
  },
  worked_at: {
    type: String,
    required: false,
    trim: true,
  },
  location: {
    type: String,
    required: false,
    trim: true,
  },
  linkedin_url: {
    type: String,
    required: false,
    trim: true,
  },
  twitter_url: {
    type: String,
    required: false,
    trim: true,
  },
  facebook_url: {
    type: String,
    required: false,
    trim: true,
  },
  instagram_url: {
    type: String,
    required: false,
    trim: true,
  },
  github_url: {
    type: String,
    required: false,
    trim: true,
  },
  website_url: {
    type: String,
    required: false,
    trim: true,
  }
}, {
  timestamps: true
});

export const Founder = mongoose.model("Founder", FounderSchema);