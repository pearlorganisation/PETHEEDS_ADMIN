import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-toastify';
import {
  deleteProduct,
  getAllProducts,
  updateProduct,
  createProduct,
} from '../actions/product';

const initialState = {
  isLoading: false,
  isUpdated: false,
  isSuccess: false,
  errorMessage: '',
  productData: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // signUp lifecycle methods
      .addCase(getAllProducts.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = '';
        state.isUpdated = false;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdated = false;
        state.errorMessage = '';
        console.log("API Response Payload:", action.payload);
        state.productData = action.payload.data;
        console.log("Reducer - Updated productData:", state.productData);
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isUpdated = false;
        state.errorMessage = action.payload;
      })
      .addCase(deleteProduct.pending, (state, action) => {
        state.isLoading = true;
        state.isUpdated = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdated = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isUpdated = false;
        state.errorMessage = action.payload;
        state.productData = state.productData.filter(
          (product) => product._id !== action?.payload?.payload
        );
      })
      .addCase(updateProduct.pending, (state, action) => {
        state.isLoading = true;
        state.isUpdated = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdated = true;
      })
      // .addCase(updateProduct.pending, (state, action) => {})
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isUpdated = false;
        state.errorMessage = action.payload;
      })

      .addCase(createProduct.pending, (state, action) => {
        state.isLoading = true;
        state.isUpdated = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdated = true;
      })
      // .addCase(updateProduct.pending, (state, action) => {})
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isUpdated = false;
        state.errorMessage = action.payload ? action.payload : 'An error occurred while creating the product.';
      });
  },
});

export default productSlice.reducer;
export const {} = productSlice.actions;
