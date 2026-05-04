import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  lectures: []
};

// ================= GET LECTURES =================
export const getCourseLectures = createAsyncThunk(
  "course/lecture/get",
  async (cid, thunkAPI) => {
    try {
      const response = axiosInstance.get(`/courses/${cid}/lectures`, {
        withCredentials: true
      });

      toast.promise(response, {
        loading: "Fetching course lectures",
        success: "Lecture fetched successfully",
        error: "Failed to load the lectures"
      });

      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// ================= ADD LECTURE =================
export const addCourseLectures = createAsyncThunk(
  "course/lecture/add",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("lecture", data.lecture);
      formData.append("title", data.title);
      formData.append("description", data.description);

      const response = axiosInstance.post(
        `/courses/${data.id}/lecture`,
        formData,
        { withCredentials: true }
      );

      toast.promise(response, {
        loading: "Adding lecture",
        success: "Lecture added successfully",
        error: "Failed to add lecture"
      });

      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// ================= DELETE LECTURE =================
export const deleteCourseLectures = createAsyncThunk(
  "course/lecture/delete",
  async (data, thunkAPI) => {
    try {
      const response = axiosInstance.delete(
        `/courses/${data.courseId}/lecture/${data.lectureId}`, 
        { withCredentials: true }
      );

      toast.promise(response, {
        loading: "Deleting lecture",
        success: "Lecture deleted successfully",
        error: "Failed to delete lecture"
      });

      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// ================= SLICE =================
const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourseLectures.fulfilled, (state, action) => {
        state.lectures = action?.payload?.lectures || [];
      })
      .addCase(addCourseLectures.fulfilled, (state, action) => {
        state.lectures = action?.payload?.course?.lectures || [];
      });
  }
});

export default lectureSlice.reducer;