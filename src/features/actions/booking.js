import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../services/axiosInterceptor';


//get all bookings api
export const getAllBookings = createAsyncThunk(
  'getAllBookings',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/booking${payload.search}${payload?._id}${payload?.orderStatus}`, {
        withCredentials: true,
      });
      console.log(data, 'datatattatatatat');
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

//approval bookings api
export const updateOrderCompletion = createAsyncThunk(
  'updateOrderCompletion',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.patch(`/booking/${payload.orderId}`, payload, {
        withCredentials: true
      });
      return response;
    } catch (e) {
      return rejectWithValue(e?.message);
    }
  }
);




