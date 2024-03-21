import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../services/axiosInterceptor';
import axios from 'axios';


//get all user api
export const getAllUsers = createAsyncThunk(
  'getUser',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get('auth/user', payload, {
        withCredentials: true,
      });
      console.log(data, 'datatattatatatat');
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

//delete user api
export const deleteUser = createAsyncThunk(
  'deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      console.log(id, 'id');
      const response = await instance.delete(
        `auth/${id}`,
        
        { withCredentials: true }
      );
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);


