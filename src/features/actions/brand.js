import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../services/axiosInterceptor';


//get all brand api
export const getAllBrands = createAsyncThunk(
  'getBrand',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/brand`, payload, {
        withCredentials: true,
      });
      
      return response?.data;
    } catch (e) {
      return rejectWithValue(e?.message);
    }
  }
);

//delete brand api
export const deleteBrand = createAsyncThunk(
  'deleteBrand',
  async (id, { rejectWithValue }) => {
    try {
      console.log(id, 'id');
      const response = await instance.delete(
        `/brand/${id}`,

        { withCredentials: true }
      );
      return response;
    } catch (e) {
      return rejectWithValue(e?.message);
    }
  }
);

//update Brand api
export const updateBrand = createAsyncThunk(
  'updateBrand',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const response = await instance.patch(`/brand/${id}`, payload, {
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

//create Brand api
export const createBrand = createAsyncThunk(
  'createBrand',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/brand`, payload, {
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
