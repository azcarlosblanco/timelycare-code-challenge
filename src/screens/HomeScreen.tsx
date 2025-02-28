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

export const HomeScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const { searchResults, loading, error } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSearch = (value: string): void => {
    setSearchTerm(value);
    if (value.length >= 3) {
      dispatch(searchMovies(value));
    }
  };

  const handleRetry = (): void => {
    if (searchTerm.length >= 3) {
      dispatch(searchMovies(searchTerm));
    }
  };

  const renderItem: ListRenderItem<Movie> = ({ item }) => <MovieCard movie={item} />;

  const renderContent = (): React.ReactElement => {
    if (loading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return <ErrorMessage message={error} onRetry={handleRetry} />;
    }

    if (searchResults.length === 0 && searchTerm.length >= 3) {
      return <ErrorMessage message="No movies found" />;
    }

    return (
      <FlatList<Movie>
        data={searchResults}
        keyExtractor={(item) => item.imdbID}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
      />
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
