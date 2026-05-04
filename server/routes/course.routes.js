import { Router } from "express";
import {
  createCourse,
  getAllCourses,
  getLecturesByCourseId,
  updateCourse,
  removeCourse,
  addLecturesToCourseById,
  deleteCourseLectureById
} from "../controllers/course.controller.js";

import {
  authorizedRoles,
  authorizeSubscriber,
  isLoggedIn
} from "../middlewares/auth.middleware.js";

import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// ================= GET ALL COURSES =================
router.get("/", getAllCourses);

// ================= CREATE COURSE =================
router.post(
  "/",
  isLoggedIn,
  authorizedRoles("ADMIN"),
  upload.single("thumbnail"),
  createCourse
);

// ================= GET LECTURES (FIXED) =================
// 🔥 ADMIN + SUBSCRIBER both allowed
router.get(
  "/:id/lectures",
  isLoggedIn,
  (req, res, next) => {
    if (req.user.role === "ADMIN") return next();
    return authorizeSubscriber(req, res, next);
  },
  getLecturesByCourseId
);

// ================= UPDATE COURSE =================
router.put(
  "/:id",
  isLoggedIn,
  authorizedRoles("ADMIN"),
  updateCourse
);

// ================= DELETE COURSE =================
router.delete(
  "/:id",
  isLoggedIn,
  authorizedRoles("ADMIN"),
  removeCourse
);

// ================= ADD LECTURE =================
router.post(
  "/:id/lecture",
  isLoggedIn,
  authorizedRoles("ADMIN"),
  upload.single("lecture"),
  addLecturesToCourseById
);

// ================= DELETE LECTURE =================
router.delete(
  "/:courseId/lecture/:lectureId",
  isLoggedIn,
  authorizedRoles("ADMIN"),
  deleteCourseLectureById
);

export default router;