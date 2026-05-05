import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
    allUserCount: 0,       // ✅ Matches AdminDashboard: state.stat.allUserCount
    subscribedCount: 0,
    loading: false,
    error: null,
};

export const getStatData = createAsyncThunk('stats/get', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get('/api/v1/admin/stats/users');
        return response?.data;
    } catch (error) {
        const message = error?.response?.data?.message || "Failed to load stats";
        toast.error(message);
        return rejectWithValue(message);
    }
});

const statSlice = createSlice({
    name: "stat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getStatData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getStatData.fulfilled, (state, action) => {
                state.loading = false;
                // ✅ Handle both possible field names from backend
                state.allUserCount = action.payload?.allUserCount ?? action.payload?.allUsersCount ?? 0;
                state.subscribedCount = action.payload?.subscribedCount ?? 0;
            })
            .addCase(getStatData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default statSlice.reducer;
