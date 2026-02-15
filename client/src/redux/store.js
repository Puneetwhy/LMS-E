import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/authSlice.js"
import courseSliceReducer from "./slices/courseSlice.js";
import razorpaySliceReducer from "./slices/RazorpaySlice.js";
import lectureSliceReducer from "./slices/LectureSlice.js"
import statSliceReducer from "./slices/statSlice.js"
const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        course: courseSliceReducer,
        razorpay: razorpaySliceReducer,
        lecture: lectureSliceReducer,
        stat: statSliceReducer
    },
    devTools: true,

})

export default store;