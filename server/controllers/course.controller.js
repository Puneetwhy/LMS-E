import Course from "../models/course.model.js";
import appError from "../utils/error.util.js";
import cloudinary from 'cloudinary';
import fs from 'fs';

// Get all courses (without lectures)
const getAllCourses = async (req, res, next) => {
    try {
        const courses = await Course.find().select('-lectures');
        res.status(200).json({
            success: true,
            message: 'All courses',
            courses,
        });
    } catch (e) {
        return next(new appError(e.message, 400));
    }
};

// Get lectures by course ID
const getLecturesByCourseId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);

        if (!course) {
            return next(new appError('Invalid course id, please try again', 400));
        }

        res.status(200).json({
            success: true,
            message: 'Course lectures fetched successfully!',
            lectures: course.lectures
        });
    } catch (e) {
        return next(new appError(e.message, 400));
    }
};

// Create a new course
const createCourse = async (req, res, next) => {
    try {
        const { title, description, category, createdBy } = req.body;

        if (!title || !description || !category || !createdBy) {
            return next(new appError('All fields are required, please try again', 400));
        }

        let course = await Course.create({
            title,
            description,
            category,
            createdBy,
            thumbnail: {
                public_id: 'Dummy',
                secure_url: 'Dummy',
            }
        });

        if (req.file) {
            try {
                const result = await cloudinary.v2.uploader.upload(req.file.path, { folder: 'lms' });
                if (result) {
                    course.thumbnail.public_id = result.public_id;
                    course.thumbnail.secure_url = result.secure_url;
                }

                fs.rmSync(`uploads/${req.file.filename}`); // sync removal
            } catch (e) {
                return next(new appError(e.message, 500));
            }
        }

        await course.save();

        res.status(200).json({
            success: true,
            message: 'Course created successfully!',
            course
        });
    } catch (e) {
        return next(new appError(e.message, 500));
    }
};

// Update a course by ID
const updateCourse = async (req, res, next) => {
    try {
        const { id } = req.params;

        const course = await Course.findByIdAndUpdate(
            id,
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!course) {
            return next(new appError('Course with given id does not exist!', 400));
        }

        res.status(200).json({
            success: true,
            message: 'Course updated successfully!',
            course
        });
    } catch (e) {
        return next(new appError(e.message, 500));
    }
};

// Remove course by ID
const removeCourse = async (req, res, next) => {
    try {
        const { id } = req.params;

        const course = await Course.findById(id);
        if (!course) {
            return next(new appError('Course with given id does not exist', 400));
        }

        await Course.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Course deleted successfully!'
        });
    } catch (e) {
        return next(new appError(e.message, 500));
    }
};

// Add lectures to a course
const addLecturesToCourseById = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const { id } = req.params;

        if (!title || !description) {
            return next(new appError('All fields are required', 400));
        }

        const course = await Course.findById(id);
        if (!course) {
            return next(new appError('Course with given id does not exist', 400));
        }

        const lectureData = { title, description, lecture: {} };

        if (req.file) {
            try {
                const result = await cloudinary.v2.uploader.upload(req.file.path, { folder: 'lms' });
                if (result) {
                    lectureData.lecture.public_id = result.public_id;
                    lectureData.lecture.secure_url = result.secure_url;
                }

                fs.rmSync(`uploads/${req.file.filename}`);
            } catch (e) {
                return next(new appError(e.message, 500));
            }
        }

        course.lectures.push(lectureData);
        course.numberOfLectures = course.lectures.length;

        await course.save();

        res.status(200).json({
            success: true,
            message: 'Lecture added successfully!',
            course
        });
    } catch (e) {
        return next(new appError(e.message, 400));
    }
};

export {
    getAllCourses,
    getLecturesByCourseId,
    createCourse,
    updateCourse,
    removeCourse,
    addLecturesToCourseById
};