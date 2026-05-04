import { Router } from "express";

import {
  contactUs,
  userStats,
} from "../controllers/miscellaneous.controller.js";

import {
  authorizedRoles,
  isLoggedIn,
} from "../middlewares/auth.middleware.js";

const router = Router();

// ================= CONTACT =================
router.post("/", contactUs);

// ================= ADMIN USER STATS =================
router.get(
  "/admin/stats/users",
  isLoggedIn,
  authorizedRoles("ADMIN"),
  userStats
);

export default router;