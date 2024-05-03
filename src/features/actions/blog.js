import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../services/axiosInterceptor';

//get all blog api
export const getAllBlogs = createAsyncThunk(
  'getBlog',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get('/blog', payload, {
        withCredentials: true,
      });
      console.log(data, 'datatattatatatat');
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

//delete blog api
export const deleteBlog = createAsyncThunk(
  'deleteBlog',
  async (id, { rejectWithValue }) => {
    try {
      console.log(id, 'id');
      const response = await instance.delete(
        `/blog/${id}`,

        { withCredentials: true }
      );
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

//update Blog api
export const updateBlog = createAsyncThunk(
  'updateBlog',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const response = await instance.patch(`/blog/${id}`, payload, {
        withCredentials: true,
        headers: {
          'Content-type': 'multipart/form-data',
        },
      });
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

//create Blog api
export const createBlog = createAsyncThunk(
  'createBlog',
  async ({ formData }, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/blog`, formData, {
        withCredentials: true,
        headers: {
          'Content-type': 'multipart/form-data',
        },
      });
      return response;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
