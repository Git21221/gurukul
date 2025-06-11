import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from '../../../../../env.js';
import { roles } from '../../../../../gurukul/gurukul-apps/server/config/constants.js';

const userSchema = new mongoose.Schema(
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
      required: false,
    },
    platform_of_account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
      required: true,
    },
    certificate_count: {
      type: Number,
      default: 0,
    },
    certificates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Certificate',
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.index({ emailId: 1, platform_of_account: 1 }, { unique: true });

userSchema.index({ ipv4_address: 1, platform_of_account: 1 }, { unique: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
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

userSchema.methods.generateRefreshToken = function () {
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

userSchema.methods.hashUserRole = function () {
  return jwt.sign(
    {
      _id: this._id,
      role: roles.USER,
    },
    env.JWT_USER_ROLE_SECRET,
    {
      expiresIn: env.JWT_USER_ROLE_SECRET_EXPIRES_IN,
    }
  );
};

export const User = mongoose.model('User', userSchema);
