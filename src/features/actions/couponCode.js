import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../../services/axiosInterceptor';



//get all CouponCode api
export const getAllCouponCodes = createAsyncThunk(
  'getAllCouponCodes',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get('/couponCode', payload, {
        withCredentials: true,
      });
      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

//update CouponCode api
export const updateCouponCode = createAsyncThunk(
    'updateCouponCode',
    async (id, { rejectWithValue }) => {
      try {
        const response = await instance.delete(
          `/couponCode/${id}`,
          
          { withCredentials: true }
        );
        return response;
      } catch (e) {
        return rejectWithValue(e.message);
      }
    }
  );

  //create couponCode api
export const createCouponCode = createAsyncThunk(
    'createCouponCode',
    async (payload, { rejectWithValue }) => {
      try {
        const response = await instance.post(`/couponCode`, payload, {
          withCredentials: true
        });
        return response;
      } catch (e) {
        return rejectWithValue(e.message);
      }
    }
  );
  

