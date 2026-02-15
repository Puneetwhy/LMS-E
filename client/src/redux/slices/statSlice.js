import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../helpers/axiosInstance"

const initialState = {
    allUsersCount : 0,
    subscribedCount: 0,
}

export const getStatData = createAsyncThunk('stats/get', async () =>{
    try {
        const response = await axiosInstance.get('/admin/stats/users');
        toast.promise({
            loading: 'Getting the stats...',
            success: (data) => {
                return data?.data?.message;
            },

            error:'Failed to load data stats'
        })
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to load stats");
    }
}) 

const statSlice = createSlice({
    name:"state",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
            .addCase(getStatData.fulfilled, (state, action) => {
                state.allUsersCount = action?.payload?.allUsersCount || 0;
                state.subscribedCount = action?.payload?.subscribedCount || 0;
            })
             .addCase(getStatData.pending, (state) => { state.loading = true })
            .addCase(getStatData.rejected, (state) => { state.loading = false })

    }
})

export default statSlice.reducer;