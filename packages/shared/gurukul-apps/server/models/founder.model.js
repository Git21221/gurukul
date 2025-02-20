import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../../../../../env.js";

const FounderSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      maxlength: 24,
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
    },
  },
  {
    timestamps: true,
  }
);

FounderSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

FounderSchema.methods.isPasswordCorrect = async function (password) {
  console.log(password, this.password);
  
  return await bcrypt.compare(password, this.password);
};

FounderSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      fullName: this.fullName,
    },
    env.JWT_ACCESS_TOKEN_SECRET,
    {
      expiresIn: env.JWT_ACCESS_TOKEN_SECRET_EXPIRES_IN,
    }
  );
};

FounderSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    env.JWT_REFRESH_TOKEN_SECRET,
    {
      expiresIn: env.JWT_REFRESH_TOKEN_SECRET_EXPIRES_IN,
    }
  );
};

export const Founder = mongoose.model("Founder", FounderSchema);
