import { createSlice } from '@reduxjs/toolkit';

import {
  deleteAppointment,
  getAllAppointments,
  updateAppointment,
  createAppointment,
} from '../actions/appointment';
import toast from 'react-hot-toast';

const initialState = {
  isLoading: false,
  isUpdated: false,
  isSuccess: false,
  isDeleted: false,
  errorMessage: '',
  appointmentData: [],
};

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // signUp lifecycle methods
      .addCase(getAllAppointments.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(getAllAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleted = false;
        state.errorMessage = '';
        console.log('API Response Payload:', action.payload);
        state.appointmentData = action.payload.data;
        console.log('Reducer - Updated appointmentData:', state.appointmentData);
      })
      .addCase(getAllAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      .addCase(deleteAppointment.pending, (state, action) => {
        state.isLoading = true;
        state.isDeleted = false;
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleted = true;
        state.appointmentData = state.appointmentData.filter(
          (appointment) => appointment._id !== action?.payload?.payload
        );
        toast.success("Appointment Deleted successfully", {
          position: "top-right",
         }); 
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.isDeleted = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
        
        
      })
      .addCase(updateAppointment.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appointmentData = action.payload.data;
        toast.success("Product Updated successfully", {
          position: "top-right",
         }); 
      })

      .addCase(updateAppointment.rejected, (state, action) => {
        state.isLoading = false;

        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
        
      })
      .addCase(createAppointment.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
      
        state.appointmentData = action.payload.data;
      })

      .addCase(createAppointment.rejected, (state, action) => {
        state.isLoading = false;

        state.errorMessage = action.payload
          ? action.payload
          : 'An error occurred while creating the Appointment.';
      });
  },
});

export default appointmentSlice.reducer;
export const {} = appointmentSlice.actions;
