import Course from "../models/course.model.js";
import appError from "../utils/error.util.js";
import cloudinary from "cloudinary";
import fs from "fs";

// ---------------------- Get all courses (without lectures) ----------------------
const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().select("-lectures");
    res.status(200).json({
      success: true,
      message: "All courses fetched successfully",
      courses,
    });
  } catch (e) {
    return next(new appError(e.message, 500));
  }
};

// ---------------------- Get lectures by course ID ----------------------
const getLecturesByCourseId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);

    if (!course) {
      return next(new appError("Invalid course id, please try again", 400));
    }

    res.status(200).json({
      success: true,
      message: "Course lectures fetched successfully",
      lectures: course.lectures,
    });
  } catch (e) {
    return next(new appError(e.message, 500));
  }
};

// ---------------------- Create a new course ----------------------
const createCourse = async (req, res, next) => {
  try {
    const { title, description, category, createdBy } = req.body;

    if (!title || !description || !category || !createdBy) {
      return next(new appError("All fields are required", 400));
    }

    let course = await Course.create({
      title,
      description,
      category,
      createdBy,
      thumbnail: {
        public_id: "Dummy",
        secure_url: "Dummy",
      },
    });

    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "lms",
          resource_type: "image",
        });

        course.thumbnail.public_id = result.public_id;
        course.thumbnail.secure_url = result.secure_url;

        // Remove local file
        if (fs.existsSync(req.file.path)) fs.rmSync(req.file.path);
      } catch (e) {
        return next(new appError("Thumbnail upload failed: " + e.message, 500));
      }
    }

    await course.save();

    res.status(200).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (e) {
    return next(new appError(e.message, 500));
  }
};

// ---------------------- Update a course by ID ----------------------
const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndUpdate(id, { $set: req.body }, { runValidators: true, new: true });

    if (!course) {
      return next(new appError("Course with given id does not exist!", 400));
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course,
    });
  } catch (e) {
    return next(new appError(e.message, 500));
  }
};

// ---------------------- Remove course by ID ----------------------
const removeCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);

    if (!course) return next(new appError("Course with given id does not exist", 400));

    await Course.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (e) {
    return next(new appError(e.message, 500));
  }
};

// ---------------------- Add lecture to course ----------------------
const addLecturesToCourseById = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;

    if (!title || !description) return next(new appError("All fields are required", 400));

    const course = await Course.findById(id);
    if (!course) return next(new appError("Course with given id does not exist", 400));

    const lectureData = { title, description, lecture: {} };

    if (req.file) {
      if (!req.file.path) return next(new appError("No file found to upload", 400));

      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "lms",
          resource_type: "video", // important for video files
        });

        lectureData.lecture.public_id = result.public_id;
        lectureData.lecture.secure_url = result.secure_url;

        if (fs.existsSync(req.file.path)) fs.rmSync(req.file.path);
      } catch (e) {
        return next(new appError("Cloudinary upload failed: " + e.message, 500));
      }
    }

    course.lectures.push(lectureData);
    course.numberOfLectures = course.lectures.length;

    await course.save();

    res.status(200).json({
      success: true,
      message: "Lecture added successfully",
      course,
    });
  } catch (e) {
    console.error(e);
    return next(new appError("Failed to add lecture: " + e.message, 500));
  }
};

// ---------------------- Delete lecture from course ----------------------
const deleteCourseLectureById = async (req, res, next) => {
  try {
    const { courseId, lectureId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) return next(new appError("Course not found", 400));

    course.lectures = course.lectures.filter(l => l._id.toString() !== lectureId);
    course.numberOfLectures = course.lectures.length;

    await course.save();

    res.status(200).json({
      success: true,
      message: "Lecture deleted successfully",
      course,
    });
  } catch (e) {
    return next(new appError(e.message, 500));
  }
};

export {
  getAllCourses,
  getLecturesByCourseId,
  createCourse,
  updateCourse,
  removeCourse,
  addLecturesToCourseById,
  deleteCourseLectureById
};