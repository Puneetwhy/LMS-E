import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    courseData: []
};

export const getAllCourses = createAsyncThunk("/course/get", async () => {
    try {
        const response = await axiosInstance.get("/courses");
        toast.promise(response, {
            loading: "loading course data...",
            success: "Courses loaded successfully",
            error: "Failed to get the courses",
        });
        return response.data.courses;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const createNewCourse = createAsyncThunk("/course/create", async (formData) => {
    try {
        const response = await axiosInstance.post("/courses", formData);
        toast.promise(response, {
            loading: 'Creating new course...',
            success: 'Course created successfully',
            error: 'Failed to create course'
        });
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
    try {
        const response = await axiosInstance.delete(`/courses/${id}`);
        toast.promise(response, {
            loading: "Deleting course...",
            success: "Course deleted successfully",
            error: "Failed to delete course",
        });
        return response.data.courses;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCourses.fulfilled, (state, action) => {
                if (action.payload) state.courseData = [...action.payload];
            })
            .addCase(createNewCourse.fulfilled, (state, action) => {
                if (action.payload?.course) state.courseData.push(action.payload.course);
            });
    }
});

export default courseSlice.reducer;