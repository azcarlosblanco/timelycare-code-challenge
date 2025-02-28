import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Movie, SearchResponse } from '../types/movie';
import axios from 'axios';
import { API_CONSTANTS } from '../utils/constants';

export const searchMovies = createAsyncThunk(
  'movies/search',
  async (searchTerm: string) => {
    const response = await axios.get<SearchResponse>(
      `${API_CONSTANTS.BASE_URL}?apikey=${API_CONSTANTS.API_KEY}&s=${searchTerm}`
    );
    return response.data.Search || [];
  }
);

interface MoviesState {
  searchResults: Movie[];
  favorites: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  searchResults: [],
  favorites: [],
  loading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        movie => movie.imdbID !== action.payload.imdbID
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.searchResults = action.payload;
        state.loading = false;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export const { addToFavorites, removeFromFavorites } = moviesSlice.actions;
export default moviesSlice.reducer;
