import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance"
import { toast } from "react-hot-toast";   

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: JSON.parse(localStorage.getItem("data")) || {},
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

export const login = createAsyncThunk("/auth/login", async(data) => {
    console.log(data);
    try{
        const promise = axiosInstance.post("user/login", data);
        console.log(promise)  
        toast.promise(promise,{
            loading: "Wait! authentication in progress...",
            success: (res) => {    
                console.log("Backend success response:", res.data);                  
                return res?.data?.message;
            },
            error: (err) => {
                console.log("Backend error response:", err.response?.data);
                return err?.response?.data?.message || "Failed to login";
            }
        });

        const res = await promise;
        return res.data;                             
    }catch(error){
        toast.error(error?.response?.data?.message || "Failed to failed to login");
        throw error;   
    }
})

export const logout = createAsyncThunk( "/auth/logout", async ()=> {
    try{
        const promise = axiosInstance.post("user/logout");
        console.log(promise)  
        toast.promise(promise,{
            loading: "Wait! logout in progress...",
            success: (res) => {                      
                return res?.data?.message;
            },
            error: (err) => { 
                return err?.response?.data?.message || "Failed to logout";
            }
        });

        const res = await promise;
        return res.data; 

    }catch(error){
        toast.error(error?.response?.data?.message);
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(login.fulfilled, (state, action) => {
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role
        })

        .addCase(logout.fulfilled, (state) => {
            localStorage.clear();
            state.data = {};
            state.isLoggedIn = false;
            state.role = "";
        })
    }
});

//export const {} = authSlice.actions;
export default authSlice.reducer;