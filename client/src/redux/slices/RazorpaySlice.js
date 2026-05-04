import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import { toast } from "react-hot-toast";

const initialState = {
  key: "",
  subscription_id: "",
  isPaymentVerified: false,
  allPayments: {},
  finalMonths: {},
  monthlySalesRecord: [],
};

// ================= KEY =================
export const getRazorPayId = createAsyncThunk(
  "razorpay/key",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/payments/razorpay-key");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// ================= SUBSCRIBE =================
export const purchaseCourseBundle = createAsyncThunk(
  "razorpay/subscribe",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/payments/subscribe");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// ================= VERIFY =================
export const verifyUserPayment = createAsyncThunk(
  "razorpay/verify",
  async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/payments/verify", data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// ================= CANCEL =================
export const cancelCourseBundle = createAsyncThunk(
  "razorpay/cancel",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/payments/unsubscribe");
      toast.success(res.data.message);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// ================= RECORD =================
export const getPaymentRecord = createAsyncThunk(
  "razorpay/record",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/payments?count=100");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// ================= SLICE =================
const razorpaySlice = createSlice({
  name: "razorpay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRazorPayId.fulfilled, (state, action) => {
        state.key = action.payload.key;
      })
      .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
        state.subscription_id = action.payload.subscription_id;
      })
      .addCase(verifyUserPayment.fulfilled, (state, action) => {
        state.isPaymentVerified = action.payload.success;
      })
      .addCase(getPaymentRecord.fulfilled, (state, action) => {
        state.allPayments = action.payload.allPayments;
        state.finalMonths = action.payload.finalMonths;
        state.monthlySalesRecord = action.payload.monthlySalesRecord;
      });
  },
});

export default razorpaySlice.reducer;