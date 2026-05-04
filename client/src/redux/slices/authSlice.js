import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import { toast } from "react-hot-toast";

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
    role: localStorage.getItem('role') || "",
    data: (() => {
        try {
            const value = localStorage.getItem("data");
            if (!value || value === "undefined") return {};
            return JSON.parse(value);
        } catch {
            return {};
        }
    })(),
};

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    try {
        const promise = axiosInstance.post("/api/v1/user/register", data);

        toast.promise(promise, {
            loading: "Wait! creating your account...",
            success: (res) => res?.data?.message || "Account created successfully",
            error: (err) => err?.response?.data?.message || "Failed to create user account",
        });

        const res = await promise;
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to create account");
        throw error;
    }
});

export const login = createAsyncThunk("/auth/login", async (data) => {
    try {
        const promise = axiosInstance.post("/api/v1/user/login", data);

        toast.promise(promise, {
            loading: "Wait! authentication in progress...",
            success: (res) => res?.data?.message || "Login successful",
            error: (err) => err?.response?.data?.message || "Failed to login",
        });

        const res = await promise;
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to login");
        throw error;
    }
});

export const logout = createAsyncThunk("/auth/logout", async () => {
    try {
        const promise = axiosInstance.post("/api/v1/user/logout");

        toast.promise(promise, {
            loading: "Wait! logout in progress...",
            success: (res) => res?.data?.message || "Logged out successfully",
            error: (err) => err?.response?.data?.message || "Failed to logout",
        });

        const res = await promise;
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to logout");
        throw error;
    }
});

export const updateProfile = createAsyncThunk("/user/update/profile", async (data) => {
    try {
        const promise = axiosInstance.put(`/api/v1/user/update/${data[0]}`, data[1]);

        toast.promise(promise, {
            loading: "Wait! profile update in progress...",
            success: (res) => res?.data?.message || "Profile updated successfully",
            error: (err) => err?.response?.data?.message || "Failed to update profile",
        });

        const res = await promise;
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to update profile");
        throw error;
    }
});

export const getUserData = createAsyncThunk("/user/details", async () => {
    try {
        const res = await axiosInstance.get("/api/v1/user/me");
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to fetch user data");
        throw error;
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                if (action.payload?.user) {
                    localStorage.setItem("data", JSON.stringify(action.payload.user));
                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("role", action.payload.user.role || "");
                    
                    state.isLoggedIn = true;
                    state.data = action.payload.user;
                    state.role = action.payload.user.role || "";
                }
            })

            .addCase(logout.fulfilled, (state) => {
                localStorage.clear();
                state.data = {};
                state.isLoggedIn = false;
                state.role = "";
            })

            .addCase(getUserData.fulfilled, (state, action) => {
                if (action.payload?.user) {
                    localStorage.setItem("data", JSON.stringify(action.payload.user));
                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("role", action.payload.user.role || "");

                    state.isLoggedIn = true;
                    state.data = action.payload.user;
                    state.role = action.payload.user.role || "";
                }
            });
    }
});

export default authSlice.reducer;