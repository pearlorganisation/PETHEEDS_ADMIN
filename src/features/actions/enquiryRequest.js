import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../services/axiosInterceptor';
import axios from 'axios';

//get all enquiryRequest api
export const getAllEnquiryRequests = createAsyncThunk(
  'getEnquiryRequest',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get('/callbackRequest', payload, {
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
  async (id, { rejectWithValue }) => {
    try {
  
      const response = await instance.delete(
        `/callbackRequest/${id}`,
      
        { withCredentials: true }
      );
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);


