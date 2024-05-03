import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../services/axiosInterceptor';



//get all banner api
export const getAllBanners = createAsyncThunk(
  'getBanner',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get('/banner', payload, {
        withCredentials: true,
      });
      console.log(data, 'datatattatatatat');
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

//delete banner api
export const deleteBanner = createAsyncThunk(
    'deleteBanner',
    async (id, { rejectWithValue }) => {
      try {
        console.log(id, 'id');
        const response = await instance.delete(
          `/banner/${id}`,
          
          { withCredentials: true }
        );
        return response;
      } catch (e) {
        return rejectWithValue(e);
      }
    }
  );

  //create Banner api
export const createBanner = createAsyncThunk(
    'createBanner',
    async (payload, { rejectWithValue }) => {
      try {
        const response = await instance.post(`/banner`, payload, {
          withCredentials: true,
          headers: {
            "Content-type": "multipart/form-data",
          },
        });
        return response;
      } catch (e) {
        return rejectWithValue(e);
      }
    }
  );
  
  //update Banner api
export const updateBanner = createAsyncThunk(
    'updateBanner',
    async ({id,payload}, { rejectWithValue }) => {
      try {
        const response = await instance.patch(`/banner/${id}`, payload, {
          withCredentials: true,
          headers: {
            "Content-type": "multipart/form-data",
          },
        });
        return response;
      } catch (e) {
        return rejectWithValue(e);
      }
    }
  );
  