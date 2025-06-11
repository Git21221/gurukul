import mongoose from 'mongoose';
import { roles } from '../../../../../gurukul/gurukul-apps/server/config/constants.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from '../../../../../env.js';

const mentorSchema = new mongoose.Schema(
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
      ref: 'Referral',
    },
    belongs_to_brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
    },
  },
  {
    timestamps: true,
  }
);

mentorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

mentorSchema.methods.isPasswordCorrect = async function (password) {
  console.log(password, this.password);

  return await bcrypt.compare(password, this.password);
};

mentorSchema.methods.generateAccessToken = function () {
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

mentorSchema.methods.generateRefreshToken = function () {
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

mentorSchema.methods.hashUserRole = function () {
  return jwt.sign(
    {
      _id: this._id,
      role: roles.MENTOR,
    },
    env.JWT_USER_ROLE_SECRET,
    {
      expiresIn: env.JWT_USER_ROLE_SECRET_EXPIRES_IN,
    }
  );
};

export const Mentor = mongoose.model('Mentor', mentorSchema);
