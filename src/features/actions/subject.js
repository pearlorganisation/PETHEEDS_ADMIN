import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../services/axiosInterceptor';


//get all subject api
export const getAllSubjects = createAsyncThunk(
  'getSubject',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get('/subject', payload, {
        withCredentials: true,
      });

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
      
      const response = await instance.delete(
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
      const response = await instance.patch(`/subject/${id}`, payload, {
        withCredentials: true,
      });
      return response;
    } catch (e) {
      return rejectWithValue;
    }
  }
);

export const createSubject = createAsyncThunk(
  'createSubject',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/subject`, payload, {
        withCredentials: true,
       
      });
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);