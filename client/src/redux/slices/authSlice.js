import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance"
import { toast } from "react-hot-toast";   

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') || {},
};

export const createAccount = createAsyncThunk("/auth/signup", async(data) => {
    console.log(data);
    try{
        const promise = axiosInstance.post("user/register", data);
        console.log(promise)  
        toast.promise(promise,{
            loading: "Wait! creating your account...",
            success: (res) => {    
                console.log("Backend success response:", res.data);                  
                return res?.data?.message;
            },
            error: (err) => {
                console.log("Backend error response:", err.response?.data);
                return err?.response?.data?.message || "Failed to create user account";
            }
        });

        const res = await promise;
        return res.data;                             
    }catch(error){
        toast.error(error?.response?.data?.message || "Failed to create account");
        throw error;   
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
});

export const {} = authSlice.actions;
export default authSlice.reducer;