import { createSlice } from '@reduxjs/toolkit';

import {
  getAllCouponCodes,
  createCouponCode,
  updateCouponCode,
} from '../actions/couponCode';
import toast from 'react-hot-toast';

const initialState = {
  isLoading: false,
  isUpdated: false,
  isSuccess: false,
  isDeleted: false,
  errorMessage: '',
  couponCodeData: [],
};

const couponCodeSlice = createSlice({
  name: 'couponCode',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // signUp lifecycle methods
      .addCase(getAllCouponCodes.pending, (state, action) => {
        state.isLoading = true;     
        state.errorMessage = '';
        
      })
      .addCase(getAllCouponCodes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = '';
        state.isUpdated = false;
        state.couponCodeData = action.payload.data;
      })
      .addCase(getAllCouponCodes.rejected, (state, action) => {
        state.isLoading = false;     
        state.errorMessage = action.payload;
      })
      .addCase(updateCouponCode.pending, (state, action) => {
        state.isLoading = true;
        state.isUpdated = false;
      })
      .addCase(updateCouponCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdated = true;
        toast.success("Coupon Code Deleted successfully", {
          position: "top-right",
         }); 
    
      })
      .addCase(updateCouponCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isUpdated = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
        
      })
   
      .addCase(createCouponCode.pending, (state, action) => {
        state.isLoading = true;
       
      })
      .addCase(createCouponCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.couponCodeData = action.payload.data;
        toast.success("Coupon Code Added successfully", {
          position: "top-right",
        });
      })
     
      .addCase(createCouponCode.rejected, (state, action) => {
        state.isLoading = false;
         state.errorMessage = action.payload ? action.payload : 'An error occurred while creating the couponCode.';
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })
  },
});

export default couponCodeSlice.reducer;
export const {} = couponCodeSlice.actions;
