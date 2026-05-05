import Course from "../models/course.model.js";
import appError from "../utils/error.util.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().select("-lectures").lean();
    res.status(200).json({ success: true, message: "All courses fetched successfully", courses: courses || [] });
  } catch (e) { return next(new appError(e.message, 500)); }
};

const getLecturesByCourseId = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return next(new appError("Course id is required", 400));
    const course = await Course.findById(id).lean();
    if (!course) return next(new appError("Invalid course id", 400));
    res.status(200).json({ success: true, message: "Course lectures fetched successfully", lectures: course.lectures || [] });
  } catch (e) { return next(new appError(e.message, 500)); }
};

const createCourse = async (req, res, next) => {
  try {
    const { title, description, category, createdBy } = req.body;
    if (!title || !description || !category || !createdBy) {
      return next(new appError("All fields are required", 400));
    }

    let thumbnail = {
      public_id: "placeholder",
      secure_url: "https://via.placeholder.com/250x150?text=No+Thumbnail",
    };

    if (req.file?.path) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, { folder: "lms", resource_type: "image" });
        thumbnail = { public_id: result.public_id, secure_url: result.secure_url };
      } catch (e) {
        console.error("Cloudinary upload error:", e.message);
        return next(new appError("Thumbnail upload failed: " + e.message, 500));
      } finally {
        if (fs.existsSync(req.file.path)) fs.rmSync(req.file.path);
      }
    }

    const course = await Course.create({ title, description, category, createdBy, thumbnail });

    res.status(200).json({ success: true, message: "Course created successfully", course });
  } catch (e) { return next(new appError(e.message, 500)); }
};

const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return next(new appError("Course id is required", 400));
    const allowedFields = ["title", "description", "category", "createdBy"];
    const updateData = {};
    allowedFields.forEach((field) => { if (req.body[field] !== undefined) updateData[field] = req.body[field]; });
    const course = await Course.findByIdAndUpdate(id, updateData, { runValidators: true, new: true });
    if (!course) return next(new appError("Course not found", 404));
    res.status(200).json({ success: true, message: "Course updated successfully", course });
  } catch (e) { return next(new appError(e.message, 500)); }
};

const removeCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return next(new appError("Course id is required", 400));
    const course = await Course.findById(id);
    if (!course) return next(new appError("Course not found", 404));
    if (course.thumbnail?.public_id) await cloudinary.uploader.destroy(course.thumbnail.public_id);
    await Promise.all(course.lectures.map((lec) => {
      if (lec?.lecture?.public_id) return cloudinary.uploader.destroy(lec.lecture.public_id, { resource_type: "video" });
    }));
    await Course.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Course deleted successfully" });
  } catch (e) { return next(new appError(e.message, 500)); }
};

const addLecturesToCourseById = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;
    if (!id) return next(new appError("Course id is required", 400));
    if (!title || !description) return next(new appError("All fields required", 400));
    const course = await Course.findById(id);
    if (!course) return next(new appError("Course not found", 404));
    const lectureData = { title, description, lecture: {} };
    if (req.file?.path) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, { folder: "lms", resource_type: "video" });
        lectureData.lecture = { public_id: result.public_id, secure_url: result.secure_url };
      } catch (e) {
        console.error("Cloudinary video upload error:", e.message);
        return next(new appError("Video upload failed: " + e.message, 500));
      } finally {
        if (fs.existsSync(req.file.path)) fs.rmSync(req.file.path);
      }
    }
    course.lectures.push(lectureData);
    course.numberOfLectures = course.lectures.length;
    await course.save();
    res.status(200).json({ success: true, message: "Lecture added successfully", course });
  } catch (e) { return next(new appError(e.message, 500)); }
};

const deleteCourseLectureById = async (req, res, next) => {
  try {
    const { courseId, lectureId } = req.params;
    if (!courseId || !lectureId) return next(new appError("Invalid request", 400));
    const course = await Course.findById(courseId);
    if (!course) return next(new appError("Course not found", 404));
    const lecture = course.lectures.find((l) => l._id.toString() === lectureId);
    if (!lecture) return next(new appError("Lecture not found", 404));
    if (lecture.lecture?.public_id) await cloudinary.uploader.destroy(lecture.lecture.public_id, { resource_type: "video" });
    course.lectures = course.lectures.filter((l) => l._id.toString() !== lectureId);
    course.numberOfLectures = course.lectures.length;
    await course.save();
    res.status(200).json({ success: true, message: "Lecture deleted successfully", course });
  } catch (e) { return next(new appError(e.message, 500)); }
};

export { getAllCourses, getLecturesByCourseId, createCourse, updateCourse, removeCourse, addLecturesToCourseById, deleteCourseLectureById };
