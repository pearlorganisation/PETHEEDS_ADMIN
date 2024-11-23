import { createSlice } from '@reduxjs/toolkit';
import { getAllBookings, updateOrderCompletion } from '../actions/booking';
import toast from 'react-hot-toast';

const initialState = {
  isLoading: false,

  isSuccess: false,
  isDeleted: false,
  errorMessage: '',
  bookingData: [],
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // signUp lifecycle methods
      .addCase(getAllBookings.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(getAllBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleted = false;
        state.errorMessage = '';
        console.log('API Response Payload:', action.payload);
        state.bookingData = action.payload;
      })
      .addCase(getAllBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      .addCase(updateOrderCompletion.pending, (state, action) => {
        state.isLoading = true;
       
      })
      .addCase(updateOrderCompletion.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success("Order completion status changed successfully", {
          position: "top-right",
        });
      })
     
      .addCase(updateOrderCompletion.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload ? action.payload : 'An error occurred while creating the review.';
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })
      

        
 
      
  },
});

export default bookingSlice.reducer;
export const {} = bookingSlice.actions;
