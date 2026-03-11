import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  courseData: [],
  isLoading: false,
  error: null,
};

// Fetch all courses
export const getAllCourses = createAsyncThunk(
  "courses/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/courses");
      return response.data.courses; // make sure backend returns { courses: [...] }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load courses");
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

// Create a new course (with file upload)
export const createNewCourse = createAsyncThunk(
  "courses/create",
  async (userInput, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("title", userInput.title);
      formData.append("category", userInput.category);
      formData.append("createdBy", userInput.createdBy);
      formData.append("description", userInput.description);
      if (userInput.thumbnail) {
        formData.append("thumbnail", userInput.thumbnail);
      }

      const response = await axiosInstance.post("/courses", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Course created successfully");
      return response.data.course; // return the created course object
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create course");
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

// Delete a course
export const deleteCourse = createAsyncThunk(
  "courses/delete",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/courses/${id}`);
      toast.success("Course deleted successfully");
      return id; // return deleted course id
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete course");
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET COURSES
      .addCase(getAllCourses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courseData = action.payload || [];
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to load courses";
      })

      // CREATE COURSE
      .addCase(createNewCourse.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) state.courseData.push(action.payload);
      })
      .addCase(createNewCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to create course";
      })

      // DELETE COURSE
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.courseData = state.courseData.filter(
          (course) => course._id !== action.payload
        );
      });
  },
});

export default courseSlice.reducer;