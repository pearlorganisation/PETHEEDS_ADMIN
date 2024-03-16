import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-toastify';
import {
  deleteBlog,
  getAllBlogs,
  updateBlog,
  createBlog,
} from '../actions/blog';

const initialState = {
  isLoading: false,
  isUpdated: false,
  isSuccess: false,
  isDeleted: false,
  errorMessage: '',
  blogData: [],
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // signUp lifecycle methods
      .addCase(getAllBlogs.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = '';
        
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleted = false;
        state.errorMessage = '';
        console.log('API Response Payload:', action.payload);
        state.blogData = action.payload?.data;
        console.log('Reducer - Updated blogData:', state.blogData);
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.isLoading = false;
       
        state.errorMessage = action.payload;
      })
      .addCase(deleteBlog.pending, (state, action) => {
        state.isLoading = true;
        state.isDeleted = false;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleted = true;
        state.blogData = state.blogData.filter(
          (blog) => blog._id !== action?.payload?.payload
        );
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isDeleted = false;
        state.errorMessage = action.payload;
      })
      .addCase(updateBlog.pending, (state, action) => {
        state.isLoading = true;
        state.isUpdated = false;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdated = true;
      })
      // .addCase(updateBlog.pending, (state, action) => {})
      .addCase(updateBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isUpdated = false;
        state.errorMessage = action.payload;
      })

      .addCase(createBlog.pending, (state, action) => {
        state.isLoading = true;
        state.isUpdated = false;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdated = true;
        state.blogData = action.payload?.data
      })
      // .addCase(updateBlog.pending, (state, action) => {})
      .addCase(createBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isUpdated = false;
        state.errorMessage = action.payload
          ? action.payload
          : 'An error occurred while creating the blog.';
      });
  },
});

export default blogSlice.reducer;
export const {} = blogSlice.actions;
