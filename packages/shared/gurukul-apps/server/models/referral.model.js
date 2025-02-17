import mongoose from "mongoose";

const referralSchema = new mongoose.Schema({
  referral_code: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
    maxlength: 6
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