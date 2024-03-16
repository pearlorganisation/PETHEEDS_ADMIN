import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-toastify';
import {
  deleteSubject,
  getAllSubjects,
  updateSubject,
  createSubject,
} from '../actions/subject';

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
      })
      .addCase(deleteSubject.rejected, (state, action) => {
        state.isLoading = false;
        state.isDeleted = false;
        state.errorMessage = action.payload;
        
      })
      .addCase(updateSubject.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateSubject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subjectData = action.payload.data;
      })

      .addCase(updateSubject.rejected, (state, action) => {
        state.isLoading = false;

        state.errorMessage = action.payload;
      })
      .addCase(createSubject.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createSubject.fulfilled, (state, action) => {
        state.isLoading = false;

        state.subjectData = action.payload.data;
      })

      .addCase(createSubject.rejected, (state, action) => {
        state.isLoading = false;

        state.errorMessage = action.payload
          ? action.payload
          : 'An error occurred while creating the Subject.';
      });
  },
});

export default subjectSlice.reducer;
export const {} = subjectSlice.actions;
