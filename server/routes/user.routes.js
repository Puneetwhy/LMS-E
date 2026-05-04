import { Router } from "express";

import {
  register,
  login,
  logout,
  getProfile,
  forgotPassword,
  resetPassword,
  changePassword,
  updateUser
} from "../controllers/user.controller.js";

import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// ================= REGISTER =================
router.post("/register", upload.single("avatar"), register);

// ================= LOGIN =================
router.post("/login", login);

// ================= LOGOUT =================
router.post("/logout", isLoggedIn, logout);

// ================= GET PROFILE =================
router.get("/me", isLoggedIn, getProfile);

// ================= FORGOT PASSWORD =================
router.post("/reset", forgotPassword);

// ================= RESET PASSWORD =================
router.post("/reset/:resetToken", resetPassword);

// ================= CHANGE PASSWORD =================
router.post("/change-password", isLoggedIn, changePassword);

// ================= UPDATE PROFILE =================
// 🔥 SECURITY FIX: user can update ONLY their own profile
router.put(
  "/update/:id",
  isLoggedIn,
  upload.single("avatar"),
  (req, res, next) => {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this profile",
      });
    }
    next();
  },
  updateUser
);

export default router;