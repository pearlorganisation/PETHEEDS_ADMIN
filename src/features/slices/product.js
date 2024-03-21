import { createSlice } from '@reduxjs/toolkit';

import {
  deleteProduct,
  getAllProducts,
  updateProduct,
  createProduct,
} from '../actions/product';
import toast from 'react-hot-toast';

const initialState = {
  isLoading: false,
  isUpdated: false,
  isSuccess: false,
  isDeleted: false,
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
        
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = '';
        state.isDeleted = false;
        console.log("API Response Payload:", action.payload);
        state.productData = action.payload.data;
        console.log("Reducer - Updated productData:", state.productData);
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        
        state.errorMessage = action.payload;
      })
      .addCase(deleteProduct.pending, (state, action) => {
        state.isLoading = true;
        state.isDeleted = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleted = true;
        state.productData = state.productData.filter(
          (product) => product._id !== action?.payload?.payload
        );
        toast.success("Product Deleted successfully", {
          position: "top-right",
         }); 
    
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isDeleted = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
        
      })
      .addCase(updateProduct.pending, (state, action) => {
        state.isLoading = true;
      
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        
          // Assuming the response data contains the updated product data
        state.productData = action.payload.data;
        toast.success("Product Updated successfully", {
         position: "top-right",
        }); 
      })
      // .addCase(updateProduct.pending, (state, action) => {})
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })

      .addCase(createProduct.pending, (state, action) => {
        state.isLoading = true;
       
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productData = action.payload.data;
        toast.success("Product Added successfully", {
          position: "top-right",
        });
      })
     
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
      
        state.errorMessage = action.payload ? action.payload : 'An error occurred while creating the product.';
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      });
  },
});

export default productSlice.reducer;
export const {} = productSlice.actions;
