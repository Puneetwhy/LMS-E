import { Router } from 'express';
import { 
    createCourse, 
    getAllCourses, 
    getLecturesByCourseId, 
    updateCourse, 
    removeCourse, 
    addLecturesToCourseById,
    deleteCourseLectureById
} from '../controllers/course.controller.js';
import { authorizedRoles, authorizeSubscriber, isLoggedIn } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = new Router();

// Get all courses
router.get("/", getAllCourses);

// Create course (ADMIN)
router.post(
    "/",
    isLoggedIn,
    authorizedRoles('ADMIN'),
    upload.single('thumbnail'),
    createCourse
);

// Get lectures (logged in subscribers)
router.get("/:id", isLoggedIn, authorizeSubscriber, getLecturesByCourseId);

// Update course
router.put(
    "/:id",
    isLoggedIn,
    authorizedRoles('ADMIN'),
    updateCourse
);

// Delete course
router.delete(
    "/:id",
    isLoggedIn,
    authorizedRoles('ADMIN'),
    removeCourse
);

// Add lecture to course (ADMIN)
router.post(
    "/lecture/:id",
    isLoggedIn,
    authorizedRoles('ADMIN'),
    upload.single('lecture'),
    addLecturesToCourseById
);

router.delete(
  "/lecture/:courseId/:lectureId",
  isLoggedIn,
  authorizedRoles('ADMIN'),
  deleteCourseLectureById
);

export default router;