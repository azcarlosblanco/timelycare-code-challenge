import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovies, clearError } from '../store/moviesSlice';
import { RootState, AppDispatch } from '../types/store';
import { MovieCard } from '../components/MovieCard';
import { SearchBar } from '../components/SearchBar';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';

export const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { searchResults, loading, error } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.length >= 3) {
      dispatch(searchMovies(value));
    }
  };

  const handleRetry = () => {
    if (searchTerm.length >= 3) {
      dispatch(searchMovies(searchTerm));
    }
  };

  const renderContent = () => {
    if (loading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return <ErrorMessage message={error} onRetry={handleRetry} />;
    }

    if (searchResults.length === 0 && searchTerm.length >= 3) {
        debugger
      return <ErrorMessage message="No movies found" />;
    }

    return (
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }) => <MovieCard movie={item} />}
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
