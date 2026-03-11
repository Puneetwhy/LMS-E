// multer.middleware.js
import path from "path";
import multer from "multer";
import fs from "fs";

// Ensure uploads folder exists
const uploadFolder = "uploads/";
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder);

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (_req, file, cb) => {
    // prepend timestamp to avoid file name conflicts
    const timestamp = Date.now();
    const safeName = file.originalname.replace(/\s+/g, "_"); // replace spaces
    cb(null, `${timestamp}-${safeName}`);
  },
});

// File filter for images and videos
const fileFilter = (_req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  // Allowed image and video formats
  const allowedExtensions = [
    ".jpg", ".jpeg", ".png", ".webp", // images
    ".mp4", ".webm", ".mov", ".mkv", ".ogg" // videos
  ];

  if (!allowedExtensions.includes(ext)) {
    return cb(new Error(`Unsupported file type: ${ext}`), false);
  }

  cb(null, true);
};

// Multer instance with storage, limits, and file filter
export const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200MB max for videos
  fileFilter,
});