import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../services/axiosInterceptor';


//get all review api
export const getAllReviews = createAsyncThunk(
  'getReview',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/review`, {
        withCredentials: true,
      });
      
      return response?.data;
    } catch (e) {
      return rejectWithValue(e?.message);
    }
  }
);

//get all review api
export const getParticularProductReviews = createAsyncThunk(
  'getParticularProductReviews',
  async (id, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/review/${id}`, {
        withCredentials: true,
      });
      
      return response?.data;
    } catch (e) {
      return rejectWithValue(e?.message);
    }
  }
);

//delete review api
export const deleteReview = createAsyncThunk(
  'deleteReview',
  async (id, { rejectWithValue }) => {
    try {
      console.log(id, 'id');
      const response = await instance.delete(
        `/review/${id}`,

        { withCredentials: true }
      );
      return response;
    } catch (e) {
      return rejectWithValue(e?.message);
    }
  }
);


//create Review api
export const createReview = createAsyncThunk(
  'createReview',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/review/adminGenerated`, payload, {
        withCredentials: true,
        headers: {
          'Content-type': 'multipart/form-data',
        },
      });
      return response;
    } catch (e) {
      return rejectWithValue(e?.message);
    }
  }
);

//approval Review api
export const approvalReview = createAsyncThunk(
  'approvalReview',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.patch(`/review/${payload.reviewId}`, payload, {
        withCredentials: true
      });
      return response;
    } catch (e) {
      return rejectWithValue(e?.message);
    }
  }
);
