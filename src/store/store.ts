import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice';

// Create the store
export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
