import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice';

// Create the store
export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});
