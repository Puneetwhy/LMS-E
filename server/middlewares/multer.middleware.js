import path from "path";
import multer from "multer";
import fs from "fs";

// Ensure uploads folder exists
const uploadFolder = "uploads/";
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // avoid name conflicts
  },
});

const fileFilter = (_req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (![".jpg", ".jpeg", ".webp", ".png", ".mp4"].includes(ext)) {
    return cb(new Error(`Unsupported file type ${ext}`), false);
  }
  cb(null, true);
};

export const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max
  fileFilter,
});