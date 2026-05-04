import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/authSlice";
import courseSliceReducer from "./slices/courseSlice";
import razorpaySliceReducer from "./slices/RazorpaySlice";
import lectureSliceReducer from "./slices/LectureSlice";
import statSliceReducer from "./slices/statSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course: courseSliceReducer,
    razorpay: razorpaySliceReducer,
    lecture: lectureSliceReducer,
    stat: statSliceReducer,
  },

  devTools: import.meta.env.MODE !== "production",

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;