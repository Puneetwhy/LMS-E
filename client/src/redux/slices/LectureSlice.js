import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  lectures: [],
  isLoading: false,
  error: null
};

export const getCourseLectures = createAsyncThunk(
  "course/lecture/get",
  async (cid, { rejectWithValue }) => {
    try {
      const promise = axiosInstance.get(`/courses/${cid}/lectures`);

      toast.promise(promise, {
        loading: "Fetching course lectures",
        success: (res) => res?.data?.message || "Lectures loaded",
        error: "Failed to load lectures"
      });

      const res = await promise;

      return Array.isArray(res?.data?.lectures)
        ? res.data.lectures
        : [];
    } catch (error) {
      const message =
        error?.response?.data?.message || "Error fetching lectures";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const addCourseLectures = createAsyncThunk(
  "course/lecture/add",
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("lecture", data.lecture);
      formData.append("title", data.title);
      formData.append("description", data.description);

      const promise = axiosInstance.post(
        `/courses/${data.id}/lecture`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.promise(promise, {
        loading: "Adding lecture",
        success: (res) => res?.data?.message || "Lecture added",
        error: "Failed to add lecture"
      });

      const res = await promise;

      return Array.isArray(res?.data?.course?.lectures)
        ? res.data.course.lectures
        : [];
    } catch (error) {
      const message =
        error?.response?.data?.message || "Error adding lecture";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const deleteCourseLectures = createAsyncThunk(
  "course/lecture/delete",
  async ({ courseId, lectureId }, { rejectWithValue }) => {
    try {
      const promise = axiosInstance.delete(
        `/courses/${courseId}/lecture/${lectureId}`
      );

      toast.promise(promise, {
        loading: "Deleting lecture",
        success: (res) => res?.data?.message || "Lecture deleted",
        error: "Failed to delete lecture"
      });

      await promise;

      return lectureId;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Error deleting lecture";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourseLectures.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCourseLectures.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lectures = action.payload || [];
      })
      .addCase(getCourseLectures.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(addCourseLectures.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addCourseLectures.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lectures = action.payload || [];
      })
      .addCase(addCourseLectures.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteCourseLectures.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCourseLectures.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lectures = state.lectures.filter(
          (lec) => lec._id !== action.payload
        );
      })
      .addCase(deleteCourseLectures.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export default lectureSlice.reducer;