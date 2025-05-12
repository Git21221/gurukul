import multer from "multer";

const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["video/mp4", "video/x-matroska"];
    const allowedExtensions = ["mp4", "mkv"];
    const mimetypeIsValid = allowedMimeTypes.includes(file.mimetype);
    const extIsValid = allowedExtensions.includes(
      file.originalname.split(".").pop().toLowerCase()
    );

    if (mimetypeIsValid && extIsValid) {
      return cb(null, true);
    }
    cb(
      new Error(
        "Error: File upload only supports the following filetypes - " +
          fileTypes
      )
    );
  },
});
