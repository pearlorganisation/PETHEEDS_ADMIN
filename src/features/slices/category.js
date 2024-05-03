import { createSlice } from '@reduxjs/toolkit';

import {
  deleteCategory,
  getAllCategorys,
  createCategory,
  updateCategory,
} from '../actions/category';
import toast from 'react-hot-toast';

const initialState = {
  isLoading: false,
  isUpdated: false,
  isSuccess: false,
  isDeleted: false,
  errorMessage: '',
  categoryData: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // signUp lifecycle methods
      .addCase(getAllCategorys.pending, (state, action) => {
        state.isLoading = true;
        
        state.errorMessage = '';
        
      })
      .addCase(getAllCategorys.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = '';
        state.isDeleted = false;
        console.log("API Response Payload:", action.payload);
        state.categoryData = action.payload.data;
        console.log("Reducer - Updated categoryData:", state.categoryData);
      })
      .addCase(getAllCategorys.rejected, (state, action) => {
        state.isLoading = false;
        
        state.errorMessage = action.payload;
      })
      .addCase(deleteCategory.pending, (state, action) => {
        state.isLoading = true;
        state.isDeleted = false;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleted = true;
        state.categoryData = state.categoryData.filter(
          (category) => category._id !== action?.payload?.payload
        );
        toast.success("Category Deleted successfully", {
          position: "top-right",
         }); 
    
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isDeleted = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
        
      })
   
      .addCase(createCategory.pending, (state, action) => {
        state.isLoading = true;
       
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryData = action.payload.data;
        toast.success("Category Added successfully", {
          position: "top-right",
        });
      })
     
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
      
        state.errorMessage = action.payload ? action.payload : 'An error occurred while creating the category.';
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })

      .addCase(updateCategory.pending, (state, action) => {
        state.isLoading = true;
       
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryData = action.payload.data;
        toast.success("Category Updated successfully", {
          position: "top-right",
        });
      })
     
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
      
        state.errorMessage = action.payload ? action.payload : 'An error occurred while updating the category.';
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      });
  },
});

export default categorySlice.reducer;
export const {} = categorySlice.actions;
