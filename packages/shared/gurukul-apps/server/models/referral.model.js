import mongoose from "mongoose";

const referralSchema = new mongoose.Schema({
  referral_code: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
    maxlength: 10
  },
  founder_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Founder'
  },
  brand_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand'
  },
  used: {
    type: Boolean,
    default: false
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  used_by_educator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Educator'
  },
  used_by_mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor'
  }
}, {
  timestamps: true
});

export const Referral = mongoose.model('Referral', referralSchema);