import { createSlice } from '@reduxjs/toolkit';
import { getAllBookings } from '../actions/booking';

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
        state.bookingData = action.payload.bookingData;
      })
      .addCase(getAllBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })

        
 
      
  },
});

export default bookingSlice.reducer;
export const {} = bookingSlice.actions;
