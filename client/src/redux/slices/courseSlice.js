import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  courseData: [],
  isLoading: false,
  error: null,
};

// ================= GET ALL COURSES =================
export const getAllCourses = createAsyncThunk(
  "courses/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/api/v1/courses");
      return Array.isArray(res?.data?.courses) ? res.data.courses : [];
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to load courses";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ================= CREATE COURSE =================
export const createNewCourse = createAsyncThunk(
  "courses/create",
  async (userInput, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("title", userInput.title);
      formData.append("category", userInput.category);
      formData.append("createdBy", userInput.createdBy);
      formData.append("description", userInput.description);
      if (userInput.thumbnail) {
        formData.append("thumbnail", userInput.thumbnail);
      }

      const res = await axiosInstance.post("/api/v1/courses", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Course created successfully");
      return res?.data?.course || res?.data;
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to create course";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ================= DELETE COURSE =================
export const deleteCourse = createAsyncThunk(
  "courses/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`/api/v1/courses/${id}`);
      toast.success("Course deleted successfully");
      // ✅ Return full response so AdminDashboard can check res.payload.success
      return { success: true, id, ...res?.data };
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to delete course";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const courseSlice = createSlice({
  name: "course",   // ✅ Fixed: was "courses", AdminDashboard reads state.course
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
        state.error = action.payload;
      })

      .addCase(createNewCourse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.courseData.unshift(action.payload); // Add new course at top
        }
      })
      .addCase(createNewCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.courseData = state.courseData.filter(
          (course) => course._id !== action.payload.id
        );
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default courseSlice.reducer;
