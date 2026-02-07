import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCourses } from "../../../../server/controllers/course.controller";
import reducer from "./authSlice"
import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
     courseData: []
}

export const getAllCourses = createAsyncThunk("/course/get", async () => {
    try{
        const response = axiosInstance.get("/courses");
        toast.promise(response, {
            loading: "loading course data...",
            success: "Courses loaded successfully",
            error: "Failed to get the courses",
        })

        return (await response).data.courses;
    }catch(error){
        toast.error(error?.response?.data?.message)
    }
})

const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        
    }
})

export default courseSlice.reducer;