import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../services/axiosInterceptor';



//get all category api
export const getAllCategorys = createAsyncThunk(
  'getCategory',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get('/category', payload, {
        withCredentials: true,
      });
      console.log(data, 'datatattatatatat');
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

//delete category api
export const deleteCategory = createAsyncThunk(
    'deleteCategory',
    async (id, { rejectWithValue }) => {
      try {
        console.log(id, 'id');
        const response = await instance.delete(
          `/category/${id}`,
          
          { withCredentials: true }
        );
        return response;
      } catch (e) {
        return rejectWithValue(e.message);
      }
    }
  );

  //create Category api
export const createCategory = createAsyncThunk(
    'createCategory',
    async (payload, { rejectWithValue }) => {
      try {
        const response = await instance.post(`/category`, payload, {
          withCredentials: true,
          headers: {
            "Content-type": "multipart/form-data",
          },
        });
        return response;
      } catch (e) {
        return rejectWithValue(e.message);
      }
    }
  );
  
  //update Category api
export const updateCategory = createAsyncThunk(
  'updateCategory',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const response = await instance.patch(`/category/${id}`, payload, {
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
