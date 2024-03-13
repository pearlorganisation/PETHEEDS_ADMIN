import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../services/axiosInterceptor';
import axios from 'axios';

//get all subject api
export const getAllSubjects = createAsyncThunk(
  'getSubject',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get('/subject', payload, {
        withCredentials: true,
      });
      console.log(data, 'datatattatatatat');
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

//delete subject api
export const deleteSubject = createAsyncThunk(
  'deleteSubject',
  async (payload, { rejectWithValue }) => {
    try {
      console.log(payload, 'payloaad');
      const response = await axios.delete(
        `/subject/${payload}`,
        {},
        { withCredentials: true }
      );
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const updateSubject = createAsyncThunk(
  'updateSubject',
  async ({ payload, id }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/subject/${id}`, payload, {
        withCredentials: true,
      });
      return response;
    } catch (e) {
      return rejectWithValue;
    }
  }
);
