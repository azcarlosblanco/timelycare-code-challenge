import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Movie, SearchResponse } from '../types/movie';
import axios from 'axios';
import { API_CONSTANTS } from '../utils/constants';
import { MoviesState } from '../types/movies';

export const searchMovies = createAsyncThunk(
  'movies/search',
  async (searchTerm: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<SearchResponse>(
        `${API_CONSTANTS.BASE_URL}?apikey=${API_CONSTANTS.API_KEY}&s=${searchTerm}`
      );
      
      if (response.data.Response === 'False') {
        return rejectWithValue(response.data.Error || 'No movies found');
      }
      
      return response.data.Search || [];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.Error || 'Network error occurred');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

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
    clearError: (state) => {
      state.error = null;
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.searchResults = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.searchResults = [];
        state.error = (action.payload as string) || 'An error occurred';
      });
  },
});

export const { addToFavorites, removeFromFavorites, clearError, setFavorites } = moviesSlice.actions;
export default moviesSlice.reducer;
