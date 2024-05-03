import { createSlice } from '@reduxjs/toolkit';

import {
  deleteBanner,
  getAllBanners,
  createBanner,
  updateBanner,
} from '../actions/banner';
import toast from 'react-hot-toast';

const initialState = {
  isLoading: false,
  isUpdated: false,
  isSuccess: false,
  isDeleted: false,
  errorMessage: '',
  bannerData: [],
};

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // signUp lifecycle methods
      .addCase(getAllBanners.pending, (state, action) => {
        state.isLoading = true;
        
        state.errorMessage = '';
        
      })
      .addCase(getAllBanners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = '';
        state.isDeleted = false;
        console.log("API Response Payload:", action.payload);
        state.bannerData = action.payload.data;
        console.log("Reducer - Updated bannerData:", state.bannerData);
      })
      .addCase(getAllBanners.rejected, (state, action) => {
        state.isLoading = false;
        
        state.errorMessage = action.payload;
      })
      .addCase(deleteBanner.pending, (state, action) => {
        state.isLoading = true;
        state.isDeleted = false;
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleted = true;
        state.bannerData = state.bannerData.filter(
          (banner) => banner._id !== action?.payload?.payload
        );
        toast.success("Banner Deleted successfully", {
          position: "top-right",
         }); 
    
      })
      .addCase(deleteBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isDeleted = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
        
      })
   
      .addCase(createBanner.pending, (state, action) => {
        state.isLoading = true;
       
      })
      .addCase(createBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bannerData = action.payload.data;
        toast.success("Banner Added successfully", {
          position: "top-right",
        });
      })
     
      .addCase(createBanner.rejected, (state, action) => {
        state.isLoading = false;
      
        state.errorMessage = action.payload ? action.payload : 'An error occurred while creating the banner.';
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })
      .addCase(updateBanner.pending, (state, action) => {
        state.isLoading = true;
       
      })
      .addCase(updateBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bannerData = action.payload.data;
        toast.success("Banner Updated successfully", {
          position: "top-right",
        });
      })
     
      .addCase(updateBanner.rejected, (state, action) => {
        state.isLoading = false;
      
        state.errorMessage = action.payload ? action.payload : 'An error occurred while creating the banner.';
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      });
  },
});

export default bannerSlice.reducer;
export const {} = bannerSlice.actions;
