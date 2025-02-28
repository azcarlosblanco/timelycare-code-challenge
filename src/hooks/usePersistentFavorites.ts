import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/store';
import { setFavorites } from '../store/moviesSlice';

const FAVORITES_STORAGE_KEY = '@movie_app_favorites';

export const usePersistentFavorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.movies.favorites);

  // Load favorites from AsyncStorage on mount
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
        if (storedFavorites) {
          dispatch(setFavorites(JSON.parse(storedFavorites)));
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };

    loadFavorites();
  }, [dispatch]);

  // Save favorites to AsyncStorage whenever they change
  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error('Error saving favorites:', error);
      }
    };

    saveFavorites();
  }, [favorites]);

  return null;
}; 