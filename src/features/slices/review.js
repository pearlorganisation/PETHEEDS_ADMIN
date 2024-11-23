import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { approvalReview, createReview, deleteReview, getAllReviews, getParticularProductReviews } from '../actions/review';

const initialState = {
  isLoading: false,
  isUpdated: false,
  isSuccess: false,
  isDeleted: false,
  errorMessage: '',
  reviewData: [],
  particularProductData:[]
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllReviews.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = ''; 
      })
      .addCase(getAllReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = '';
        state.isDeleted = false;
        state.reviewData = action.payload.data;
      })
      .addCase(getParticularProductReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      .addCase(getParticularProductReviews.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = ''; 
      })
      .addCase(getParticularProductReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = '';
        state.isDeleted = false;
        state.particularProductData = action.payload.data;
      })
      .addCase(getAllReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      .addCase(deleteReview.pending, (state, action) => {
        state.isLoading = true;
        state.isDeleted = false;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleted = true;
        state.reviewData = state.reviewData.filter(
          (review) => review._id !== action?.payload?.payload
        );
        toast.success("Review Deleted successfully", {
          position: "top-right",
         }); 
    
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isDeleted = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
        
      })
   
      .addCase(createReview.pending, (state, action) => {
        state.isLoading = true;
       
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviewData = action.payload.data;
        toast.success("Review Added successfully", {
          position: "top-right",
        });
      })
     
      .addCase(createReview.rejected, (state, action) => {
        state.isLoading = false;
      
        state.errorMessage = action.payload ? action.payload : 'An error occurred while creating the review.';
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })
      .addCase(approvalReview.pending, (state, action) => {
        state.isLoading = true;
       
      })
      .addCase(approvalReview.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success("Review approval status changed successfully", {
          position: "top-right",
        });
      })
     
      .addCase(approvalReview.rejected, (state, action) => {
        state.isLoading = false;
      
        state.errorMessage = action.payload ? action.payload : 'An error occurred while creating the review.';
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })
      
  },
});

export default reviewSlice.reducer;
export const {} = reviewSlice.actions;
