import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-toastify';
import {
  deleteAppointment,
  getAllAppointments,
  updateAppointment,
} from '../actions/appointment';

const initialState = {
  isLoading: false,
  isUpdated: false,
  isSuccess: false,
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
        state.isUpdated = false;
      })
      .addCase(getAllAppointments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdated = false;
        state.errorMessage = '';
        console.log("API Response Payload:", action.payload);
        state.appointmentData = action.payload.data;
        console.log("Reducer - Updated appointmentData:", state.appointmentData);
      })
      .addCase(getAllAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.isUpdated = false;
        state.errorMessage = action.payload;
      })
      .addCase(deleteAppointment.pending, (state, action) => {
        state.isLoading = true;
        state.isUpdated = false;
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdated = false;
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.isUpdated = false;
        state.errorMessage = action.payload;
        state.appointmentData = state.appointmentData.filter(
          (appointment) => appointment._id !== action?.payload?.payload
        );
      })
      .addCase(updateAppointment.pending, (state, action) => {
        state.isLoading = true;
        state.isUpdated = false;
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdated = true;
      })
      // .addCase(updateAppointment.pending, (state, action) => {})
      .addCase(updateAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.isUpdated = false;
        state.errorMessage = action.payload;
      });
  },
});

export default appointmentSlice.reducer;
export const {} = appointmentSlice.actions;
