import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import authReducer from './slices/authenticationSlice';
import product from './slices/product';
import subject from './slices/subject';
import appointment from './slices/appointment'
import user from './slices/user';
import blog from './slices/blog';
import enquiryRequest from './slices/enquiryRequest';
import banner from './slices/banner';
import category from './slices/category';
import brand from './slices/brand';
import booking from './slices/booking';
import review from './slices/review';
import couponCode from './slices/couponCode';

// ---------------------------------------------------------

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  transforms: [
    encryptTransform({
      secretKey: `${process.env.REACT_APP_REDUX_PERSIST_SECRET_KEY}`,
      onError: (err) => {
        console.log('Redux Persist Encryption Failed: ', err);
      },
    }),
  ],
  // if you do not want to persist this part of the state
  // blacklist: ["omitedPart"],
};

const reducer = combineReducers({
  auth: authReducer,
  product,
  subject,
  appointment,
  user,
  blog,
  enquiryRequest,
  banner,
  category,
  brand,
  booking,
  review,
  couponCode,
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/clearReduxStoreData') {
    state = undefined;
    localStorage.clear();
    sessionStorage.clear();
  }
  return reducer(state, action);
};

// This ensures your redux state is saved to persisted storage whenever it changes
// we pass this to the store
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.REACT_APP_WORKING_ENVIRONMENT === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

// ================================================== THE END ==================================================
