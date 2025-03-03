import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovies, clearError } from '../store/moviesSlice';
import { RootState, AppDispatch } from '../types/store';
import { MovieCard } from '../components/MovieCard';
import { SearchBar } from '../components/SearchBar';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { Movie } from '../types/movie';
import { useDebounce } from '../hooks/useDebounce';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { FadeInView } from '../components/FadeInView';
import { usePersistentFavorites } from '../hooks/usePersistentFavorites';

export const HomeScreen: React.FC = () => {
  usePersistentFavorites();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms delay
  const dispatch = useDispatch<AppDispatch>();
  const { searchResults, loading, error } = useSelector((state: RootState) => state.movies);
  const isConnected = useNetworkStatus();

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  useEffect(() => {
    if (debouncedSearchTerm.length >= 2) {
      dispatch(searchMovies(debouncedSearchTerm));
    }
  }, [debouncedSearchTerm, dispatch]);

  const handleSearch = (value: string): void => {
    setSearchTerm(value);
  };

  const handleRetry = (): void => {
    if (searchTerm.length >= 3) {
      dispatch(searchMovies(searchTerm));
    }
  };

  const renderItem: ListRenderItem<Movie> = ({ item }) => <MovieCard movie={item} />;

  const renderContent = (): React.ReactElement => {
    if (!isConnected) {
      return <ErrorMessage 
        message="No internet connection. Please check your network settings." 
        onRetry={handleRetry}
      />;
    }

    if (loading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return (
        <FadeInView>
          <ErrorMessage message={error} onRetry={handleRetry} />
        </FadeInView>
      );
    }

    if (searchResults.length === 0 && searchTerm.length >= 3) {
      return (
        <FadeInView>
          <ErrorMessage message="No movies found" />
        </FadeInView>
      );
    }

    return (
      <FadeInView>
        <FlatList<Movie>
          data={searchResults}
          keyExtractor={(item) => item.imdbID}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.gridContainer}
        />
      </FadeInView>
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar value={searchTerm} onChange={handleSearch} />
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  gridContainer: {
    padding: 8,
  },
});
