import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../../../../../env.js";
import { roles } from "../../../../../gurukul/gurukul-apps/server/config/constants.js";

const educatorSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
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
    referral: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Referral",
      required: true,
    },
    belongs_to_brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

educatorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

educatorSchema.methods.isPasswordCorrect = async function (password) {
  console.log(password, this.password);
  
  return await bcrypt.compare(password, this.password);
};

educatorSchema.methods.generateAccessToken = function () {
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

educatorSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    env
    .JWT_REFRESH_TOKEN_SECRET,
    {
      expiresIn: env.JWT_REFRESH_TOKEN_SECRET_EXPIRES_IN,
    }
  );
};

educatorSchema.methods.hashUserRole = function () {
  return jwt.sign(
    {
      _id: this._id,
      role: roles.EDUCATOR,
    },
    env.JWT_USER_ROLE_SECRET,
    {
      expiresIn: env.JWT_USER_ROLE_SECRET_EXPIRES_IN,
    }
  );
};

export const Educator = mongoose.model("Educator", educatorSchema);
