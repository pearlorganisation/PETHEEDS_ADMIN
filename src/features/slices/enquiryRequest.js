import { createSlice } from '@reduxjs/toolkit';

import {
  deleteEnquiryRequest,
  getAllEnquiryRequests,
 
} from '../actions/enquiryRequest';
import toast from 'react-hot-toast';

const initialState = {
  isLoading: false,

  isSuccess: false,
  isDeleted: false,
  errorMessage: '',
  enquiryRequestData: [],
};

const enquiryRequestSlice = createSlice({
  name: 'enquiryRequest',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // signUp lifecycle methods
      .addCase(getAllEnquiryRequests.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(getAllEnquiryRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleted = false;
        state.errorMessage = '';
        console.log('API Response Payload:', action.payload);
        state.enquiryRequestData = action.payload.data;
        console.log('Reducer - Updated enquiryRequestData:', state.enquiryRequestData);
      })
      .addCase(getAllEnquiryRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      .addCase(deleteEnquiryRequest.pending, (state, action) => {
        state.isLoading = true;
        state.isDeleted = false;
      })
      .addCase(deleteEnquiryRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleted = true;
        state.enquiryRequestData = state.enquiryRequestData.filter(
          (enquiryRequest) => enquiryRequest._id !== action?.payload?.payload
        );
        toast.success("Enquiry Request Deleted successfully", {
          position: "top-right",
         }); 
      })
      .addCase(deleteEnquiryRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isDeleted = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
        
      });
      
  },
});

export default enquiryRequestSlice.reducer;
export const {} = enquiryRequestSlice.actions;
