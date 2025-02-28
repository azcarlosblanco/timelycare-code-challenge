import { Movie } from "./movie";

export interface MoviesState {
  searchResults: Movie[];
  favorites: Movie[];
  loading: boolean;
  error: string | null;
} 