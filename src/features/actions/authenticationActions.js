import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";

// ------------------------------------Async Actions----------------------------------

//Signup send OTP and verify Otp Api bith in single Api
export const generateSignupOTP = createAsyncThunk(
  "auth/sendOtpForSignUp",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post("mail/generateSignUpOtp", payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//Signup Api
export const signUp = createAsyncThunk(
  "user/signup",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post("auth/signUp", payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Fetch signUp data:::", response);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

//Login send OTP Api and verify OTP Api both work in one Api
export const generateLoginOTP = createAsyncThunk(
  "auth/sendOtpForLogin",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post("/mail/generateLoginOtp", payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//Login Api
export const logIn = createAsyncThunk(
  "user/login",
  async (payload, { rejectWithValue }) => {
    console.log("inner api:::", payload);
    try {
      const { data } = await instance.post("auth/login", payload, {
        withCredentials: true,
      });
      console.log("Login Api Called::::", data);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

// logout -- logout action to call the logout api
export const logout = createAsyncThunk(
  "auth/logout",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post("/auth/logout", payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
