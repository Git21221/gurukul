import mongoose from "mongoose";

const audioMetaDataSchema = new mongoose.Schema({
  codec_name: {
    type: String,
  },
  sample_rate: {
    type: String,
  },
  channels: {
    type: String,
  },
  profile: {
    type: String,
  },
  channel_layout: {
    type: String,
  },
}, {
  timestamps: true,
});
export const AudioMetaData = mongoose.model("AudioMetaData", audioMetaDataSchema);