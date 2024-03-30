import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  signUp,
  generateLoginOTP,
  generateSignupOTP,
  logIn,
  logout,
} from "../actions/authenticationActions";
// -------------------------------------------------------------------------------------------

// initialState -- initial state of authentication
const initialState = {
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
  isOtpSentSuccessfully: false,
  isLogInSuccess: false,
  isLogoutSuccess: false,
  isUserLoggedIn: false,
  loggedInUserData: {},
  isOtpVerified: false,
  isOtpMailSent: false,
  isPasswordReset: false,
  isMailSent: false,
  userData :[],
};

// -------------------------------------- Slices------------------------------------------------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearSignUpState: (state) => {
      state.userSignedSuccess = false;
      state.otpGenerated = false;
      state.isLoading = false;
      state.isOtpVerified = false;
      state.forgetPasswordOtpValid = null;
    },
    clearLoginUpState: (state) => {
      state.isOtpSentSuccessfully = false;
    },
    clearReduxStoreData: (state) => {},
  },
  extraReducers: (builder) => {
    builder
    
    // signUp lifecycle methods
    .addCase(signUp.pending, (state, action) => {
      state.isLoading = true;
      state.errorMessage = "";
      state.userSignedSuccess = false;
      state.isMailSent = false;
    })
    .addCase(signUp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userSignedSuccess = true;
      state.isMailSent = false;
      state.userData =action.payload.data
      toast.success(`Sign Up Successfull.`, {
        position: "top-center",
      });
    })
    .addCase(signUp.rejected, (state, action) => {
      state.isLoading = false;
      state.userSignedSuccess = false;
      state.isMailSent = false;
      state.errorMessage = action.payload;
      toast.error("Internal server error", { position: "top-center" });
    })
      // SignOtp Generate
      .addCase(generateSignupOTP.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = "";
        state.signOtpGenrated = false;
        state.isMailSent = false;
      })
      .addCase(generateSignupOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.signOtpGenrated = true;
        state.isMailSent = false;
      })
      .addCase(generateSignupOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
        state.signOtpGenrated = false;
        state.isMailSent = false;
        toast.error(action.payload, { position: "top-center" });
      })
      // sendOtpForLogin cases
      .addCase(generateLoginOTP.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isOtpSentSuccessfully = false;
        state.errorMessage = "";
      })
      .addCase(generateLoginOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isOtpSentSuccessfully = true;
      })
      .addCase(generateLoginOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isOtpSentSuccessfully = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })
      // verifyOtpAndLogin cases
      .addCase(logIn.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isLogInSuccess = false;
        state.isUserLoggedIn = false;
        state.errorMessage = "";
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.loggedInUserData = action.payload;
        state.isUserLoggedIn = true;
        state.isLogInSuccess = true;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isLogInSuccess = false;
        state.isUserLoggedIn = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })

      // Logout lifecycle methods
      .addCase(logout.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isLogoutSuccess = false;
        state.errorMessage = "";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = "";
        state.isOtpSentSuccessfully = false;
        state.isLogInSuccess = false;
        state.isLogoutSuccess = true;
        state.isUserLoggedIn = false;
        state.loggedInUserData = null;
        state.isOtpVerified = false;
        state.isOtpMailSent = false;
        state.isPasswordReset = false;
        localStorage.clear();
        sessionStorage.clear();
        localStorage.removeItem("persist:root");
        toast.success("Logout Successfully", {
          position: "top-center",
        });
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isLogoutSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      });
  },
});

// ===========================================Exports==================================================
export default authSlice.reducer;
export const {
  resetFields,
  clearReduxStoreData,
  clearSignUpState,
  clearLoginUpState,
} = authSlice.actions;
