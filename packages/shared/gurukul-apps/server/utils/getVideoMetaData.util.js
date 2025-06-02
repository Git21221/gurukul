import tmp from "tmp";
import { promises as fs } from "fs";
import ffmpeg from "fluent-ffmpeg";
import ffprobeStatic from "ffprobe-static";

// Point fluent-ffmpeg to ffprobe binary
ffmpeg.setFfprobePath(ffprobeStatic.path);

export const getVideoMetaData = async (buffer, originalname) => {
  const extension = originalname.split(".").pop();
  const tmpFile = tmp.fileSync({ postfix: `.${extension}` });

  try {
    await fs.writeFile(tmpFile.name, buffer);

    return await new Promise((resolve, reject) => {
      ffmpeg.ffprobe(tmpFile.name, (err, metadata) => {
        tmpFile.removeCallback();

        if (err) return reject(err);

        const duration = Math.round(metadata.format.duration);
        const videoStream = metadata.streams.find(s => s.codec_type === "video");
        const resolution = videoStream ? `${videoStream.width}x${videoStream.height}` : "Unknown";

        resolve({ duration, resolution, metadata });
      });
    });
  } catch (err) {
    tmpFile.removeCallback();
    throw err;
  }
};
