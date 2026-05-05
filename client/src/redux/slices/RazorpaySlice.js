import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";
import { toast } from "react-hot-toast";

const initialState = {
  key: "",
  subscription_id: "",
  isPaymentVerified: false,
  allPayments: { count: 0 },
  finalMonths: {},
  monthlySalesRecord: [],
  isLoading: false,
  error: null,
};

// ================= RAZORPAY KEY =================
export const getRazorPayId = createAsyncThunk(
  "razorpay/key",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/api/v1/payments/razorpay-key");
      return res?.data;
    } catch (err) {
      const message = err?.response?.data?.message || "Failed to get Razorpay key";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ================= CREATE SUBSCRIPTION =================
export const purchaseCourseBundle = createAsyncThunk(
  "razorpay/subscribe",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/api/v1/payments/subscribe");
      return res?.data;
    } catch (err) {
      const message = err?.response?.data?.message || "Subscription failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ================= VERIFY PAYMENT =================
export const verifyUserPayment = createAsyncThunk(
  "razorpay/verify",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/api/v1/payments/verify", data);
      return res?.data;
    } catch (err) {
      const message = err?.response?.data?.message || "Verification failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ================= CANCEL SUBSCRIPTION =================
export const cancelCourseBundle = createAsyncThunk(
  "razorpay/cancel",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/api/v1/payments/unsubscribe");
      toast.success(res?.data?.message || "Subscription cancelled");
      return res?.data;
    } catch (err) {
      const message = err?.response?.data?.message || "Cancel failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ================= GET PAYMENT RECORDS (ADMIN) =================
export const getPaymentRecord = createAsyncThunk(
  "razorpay/record",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/api/v1/payments?count=100");
      return res?.data;
    } catch (err) {
      const message = err?.response?.data?.message || "Failed to fetch records";
      // ✅ Don't toast here — admin-only route, silent fail is fine
      return rejectWithValue(message);
    }
  }
);

const razorpaySlice = createSlice({
  name: "razorpay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Loading states
      .addCase(getRazorPayId.pending, (state) => { state.isLoading = true; })
      .addCase(purchaseCourseBundle.pending, (state) => { state.isLoading = true; })
      .addCase(getPaymentRecord.pending, (state) => { state.isLoading = true; })

      // Fulfilled
      .addCase(getRazorPayId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.key = action.payload?.key || "";
      })
      .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subscription_id = action.payload?.subscription_id || "";
      })
      .addCase(verifyUserPayment.fulfilled, (state, action) => {
        state.isPaymentVerified = action.payload?.success || false;
      })
      .addCase(cancelCourseBundle.fulfilled, (state) => {
        state.subscription_id = "";
        state.isPaymentVerified = false;
      })
      .addCase(getPaymentRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allPayments = action.payload?.allPayments || { count: 0 };
        state.finalMonths = action.payload?.finalMonths || {};
        state.monthlySalesRecord = Array.isArray(action.payload?.monthlySalesRecord)
          ? action.payload.monthlySalesRecord
          : new Array(12).fill(0);
      })

      // Rejected
      .addCase(getRazorPayId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(purchaseCourseBundle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getPaymentRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default razorpaySlice.reducer;
