import { createSlice } from '@reduxjs/toolkit';

import {
  deleteBrand,
  getAllBrands,
  updateBrand,
  createBrand,
} from '../actions/brand';
import toast from 'react-hot-toast';

const initialState = {
  isLoading: false,
  isUpdated: false,
  isSuccess: false,
  isDeleted: false,
  errorMessage: '',
  brandData: [],
};

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // signUp lifecycle methods
      .addCase(getAllBrands.pending, (state, action) => {
        state.isLoading = true;

        state.errorMessage = '';
      })
      .addCase(getAllBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = '';
        state.isDeleted = false;
        console.log('API Response Payload:', action.payload);
        state.brandData = action.payload.data;
        console.log('Reducer - Updated brandData:', state.brandData);
      })
      .addCase(getAllBrands.rejected, (state, action) => {
        state.isLoading = false;

        state.errorMessage = action.payload;
      })
      .addCase(deleteBrand.pending, (state, action) => {
        state.isLoading = true;
        state.isDeleted = false;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleted = true;
        state.brandData = state.brandData.filter(
          (brand) => brand._id !== action?.payload?.payload
        );
        toast.success('Brand Deleted successfully', {
          position: 'top-right',
        });
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isDeleted = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: 'top-right',
        });
      })
      .addCase(updateBrand.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.isLoading = false;

        // Assuming the response data contains the updated brand data
        state.brandData = action.payload.data;
        toast.success('Brand Updated successfully', {
          position: 'top-right',
        });
      })
      // .addCase(updateBrand.pending, (state, action) => {})
      .addCase(updateBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
        toast.error(action.payload, {
          position: 'top-right',
        });
      })

      .addCase(createBrand.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.brandData = action.payload.data;
        toast.success('Brand Added successfully', {
          position: 'top-right',
        });
      })

      .addCase(createBrand.rejected, (state, action) => {
        state.isLoading = false;

        state.errorMessage = action.payload
          ? action.payload
          : 'An error occurred while creating the brand.';
        toast.error(state?.errorMessage, {
          position: 'top-right',
        });
      });
  },
});

export default brandSlice.reducer;
export const {} = brandSlice.actions;
