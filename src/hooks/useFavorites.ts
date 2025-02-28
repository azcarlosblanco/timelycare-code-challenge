import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Movie } from '../types/movie';
import { addToFavorites, removeFromFavorites } from '../store/moviesSlice';
import { RootState } from '../types/store';

export const useFavorites = (movie: Movie) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.movies.favorites);
  const isFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);

  const toggleFavorite = useCallback(() => {
    if (isFavorite) {
      dispatch(removeFromFavorites(movie));
    } else {
      dispatch(addToFavorites(movie));
    }
  }, [dispatch, isFavorite, movie]);

  return { isFavorite, toggleFavorite };
}; 