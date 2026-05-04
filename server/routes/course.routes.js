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

router.get("/", getAllCourses);

router.post(
  "/",
  isLoggedIn,
  authorizedRoles("ADMIN"),
  upload.single("thumbnail"),
  createCourse
);

router.get(
  "/:id/lectures",
  isLoggedIn,
  (req, res, next) => {
    if (req.user?.role === "ADMIN") return next();
    return authorizeSubscriber(req, res, next);
  },
  getLecturesByCourseId
);

router.put(
  "/:id",
  isLoggedIn,
  authorizedRoles("ADMIN"),
  updateCourse
);

router.delete(
  "/:id",
  isLoggedIn,
  authorizedRoles("ADMIN"),
  removeCourse
);

router.post(
  "/:id/lecture",
  isLoggedIn,
  authorizedRoles("ADMIN"),
  upload.single("lecture"),
  addLecturesToCourseById
);

router.delete(
  "/:courseId/lecture/:lectureId",
  isLoggedIn,
  authorizedRoles("ADMIN"),
  deleteCourseLectureById
);

export default router;