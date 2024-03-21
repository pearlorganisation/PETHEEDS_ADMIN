import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../services/axiosInterceptor';
import axios from 'axios';

//get all enquiryRequest api
export const getAllEnquiryRequests = createAsyncThunk(
  'getEnquiryRequest',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get('/enquiryRequest', payload, {
        withCredentials: true,
      });
      console.log(data, 'datatattatatatat');
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

//delete enquiryRequest api
export const deleteEnquiryRequest = createAsyncThunk(
  'deleteEnquiryRequest',
  async (payload, { rejectWithValue }) => {
    try {
      console.log(payload, 'payloaad');
      const response = await instance.delete(
        `/enquiryRequest/${payload}`,
        {},
        { withCredentials: true }
      );
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);


