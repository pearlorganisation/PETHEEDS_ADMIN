import { createSlice } from '@reduxjs/toolkit';

import {
  deleteSubject,
  getAllSubjects,
  updateSubject,
  createSubject,
} from '../actions/subject';
import toast from 'react-hot-toast';

const initialState = {
  isLoading: false,
  isUpdated: false,
  isSuccess: false,
  isDeleted: false,
  errorMessage: '',
  subjectData: [],
};

const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // signUp lifecycle methods
      .addCase(getAllSubjects.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = '';
      })
      .addCase(getAllSubjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleted = false;
        state.errorMessage = '';
        console.log('API Response Payload:', action.payload);
        state.subjectData = action.payload.data;
        console.log('Reducer - Updated subjectData:', state.subjectData);
      })
      .addCase(getAllSubjects.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
        
      })
      .addCase(deleteSubject.pending, (state, action) => {
        state.isLoading = true;
        state.isDeleted = false;
      })
      .addCase(deleteSubject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleted = true;
        state.subjectData = state.subjectData.filter(
          (subject) => subject._id !== action?.payload?.payload
        );
        toast.success("Product Deleted successfully", {
          position: "top-right",
         }); 
      })
      .addCase(deleteSubject.rejected, (state, action) => {
        state.isLoading = false;
        state.isDeleted = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
        

        
      })
      .addCase(updateSubject.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateSubject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subjectData = action.payload.data;
        toast.success("Product Updated successfully", {
          position: "top-right",
         }); 
      })

      .addCase(updateSubject.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
        

      })
      .addCase(createSubject.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createSubject.fulfilled, (state, action) => {
        state.isLoading = false;

        state.subjectData = action.payload.data;
        toast.success("Product created successfully", {
          position: "top-right",
         }); 
      })

      .addCase(createSubject.rejected, (state, action) => {
        state.isLoading = false;

        state.errorMessage = action.payload
          ? action.payload
          : 'An error occurred while creating the Subject.';
          toast.error(state?.errorMessage, {
            position: "top-right",
          });
          
      });
  },
});

export default subjectSlice.reducer;
export const {} = subjectSlice.actions;
