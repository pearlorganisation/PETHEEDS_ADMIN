import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../services/axiosInterceptor';


//get all enquiryRequest api
export const getAllBookings = createAsyncThunk(
  'getAllBookings',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/booking${payload.search}`, {
        withCredentials: true,
      });
      console.log(data, 'datatattatatatat');
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);




