import { createSlice } from '@reduxjs/toolkit';

import {
  deleteBlog,
  getAllBlogs,
  updateBlog,
  createBlog,
} from '../actions/blog';
import toast from 'react-hot-toast';

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
        toast.success("Blog Deleted successfully", {
          position: "top-right",
         }); 
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isDeleted = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
        
      })
      .addCase(updateBlog.pending, (state, action) => {
        state.isLoading = true;
        state.isUpdated = false;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdated = true;
        state.blogData = action.payload?.data
        toast.success("Blog Updated successfully", {
          position: "top-right",
         }); 
      })
  
      .addCase(updateBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isUpdated = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
        
      })

      .addCase(createBlog.pending, (state, action) => {
        state.isLoading = true;
        state.isUpdated = false;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdated = true;
        state.blogData = action.payload?.data
        toast.success("Blog created successfully", {
          position: "top-right",
         }); 
      })
   
      .addCase(createBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isUpdated = false;
        state.errorMessage = action.payload
          ? action.payload
          : 'An error occurred while creating the blog.';
          toast.error(state?.errorMessage, {
            position: "top-right",
          });
          
      });
  },
});

export default blogSlice.reducer;
export const {} = blogSlice.actions;
