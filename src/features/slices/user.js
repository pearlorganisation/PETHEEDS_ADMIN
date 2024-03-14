import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-toastify';
import {
  deleteUser,
  getAllUsers,

} from '../actions/user';

const initialState = {
  isLoading: false,
  isUpdated: false,
  isSuccess: false,
  errorMessage: '',
  userData: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // signUp lifecycle methods
      .addCase(getAllUsers.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = '';
        state.isUpdated = false;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdated = true;
        state.errorMessage = '';
        console.log("API Response Payload:", action.payload);
        state.userData = action.payload.data;
        console.log("Reducer - Updated userData:", state.userData);
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isUpdated = false;
        state.errorMessage = action.payload;
      })
      .addCase(deleteUser.pending, (state, action) => {
        state.isLoading = true;
        state.isUpdated = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdated = true;
        state.userData = state.userData.filter(
          (user) => user._id !== action?.payload?.payload
        );
    
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isUpdated = false;
        state.errorMessage = action.payload;
        
      });
    

    
  },
});

export default userSlice.reducer;
export const {} = userSlice.actions;
