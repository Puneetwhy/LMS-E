import path from "path";
import multer from "multer";
import fs from "fs";

// ================= ENSURE UPLOAD FOLDER =================
const uploadFolder = "uploads/";

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

// ================= STORAGE =================
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadFolder);
  },

  filename: (_req, file, cb) => {
    const timestamp = Date.now();

    // remove unsafe characters
    const safeName = file.originalname
      .replace(/\s+/g, "_")
      .replace(/[^\w.-]/g, "");

    cb(null, `${timestamp}-${safeName}`);
  },
});

// ================= FILE FILTER =================
const fileFilter = (_req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  const allowedExtensions = [
    ".jpg", ".jpeg", ".png", ".webp",
    ".mp4", ".webm", ".mov", ".mkv", ".ogg"
  ];

  if (!allowedExtensions.includes(ext)) {
    return cb(new Error("Unsupported file type"), false);
  }

  cb(null, true);
};

// ================= MULTER INSTANCE =================
export const upload = multer({
  storage,
  limits: {
    fileSize: 200 * 1024 * 1024, // 200MB
  },
  fileFilter,
});