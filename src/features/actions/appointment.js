import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../services/axiosInterceptor';
import axios from 'axios';

//get all appointment api
export const getAllAppointments = createAsyncThunk(
  'getAppointment',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get('/appointment', payload, {
        withCredentials: true,
      });
      console.log(data, 'datatattatatatat');
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

//delete appointment api
export const deleteAppointment = createAsyncThunk(
  'deleteAppointment',
  async (payload, { rejectWithValue }) => {
    try {
      console.log(payload, 'payloaad');
      const response = await instance.delete(
        `/appointment/${payload}`,
        {},
        { withCredentials: true }
      );
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const updateAppointment = createAsyncThunk(
  'updateAppointment',
  async ({ payload, id }, { rejectWithValue }) => {
    try {
      const response = await instance.patch(`/appointment/${id}`, payload, {
        withCredentials: true,
      });
      return response;
    } catch (e) {
      return rejectWithValue;
    }
  }
);

export const createAppointment = createAsyncThunk(
  'createAppointment',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/appointment`, payload, {
        withCredentials: true,
       
      });
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
