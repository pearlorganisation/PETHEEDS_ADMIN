import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../services/axiosInterceptor';
import axios from 'axios';


//get all product api
export const getAllProducts = createAsyncThunk(
  'getProduct',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get('/product', payload, {
        withCredentials: true,
      });
      console.log(data, 'datatattatatatat');
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

//delete product api
export const deleteProduct = createAsyncThunk(
  'deleteProduct',
  async (payload, { rejectWithValue }) => {
    try {
      console.log(payload, 'payloaad');
      const response = await axios.delete(
        `/product/${payload}`,
        {},
        { withCredentials: true }
      );
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'updateProduct',
  async ({ id, payload}, { rejectWithValue }) => {
    try {
      const response = await instance.patch(`/product/${id}`, payload, {
        withCredentials: true,
      });
      return response;
    } catch (e) {
      return rejectWithValue;
    }
  }
);

export const createProduct = createAsyncThunk(
  'createProduct',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/product`, payload, {
        withCredentials: true,
      });
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
