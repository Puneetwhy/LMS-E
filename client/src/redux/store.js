import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/authSlice.js"
import courseSliceReducer from "./slices/courseSlice.js";

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        course: courseSliceReducer
    },
    devTools: true,

})

export default store;