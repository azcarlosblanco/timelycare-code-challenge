import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovies, clearError } from '../store/moviesSlice';
import { RootState, AppDispatch } from '../store/store';
import { MovieCard } from '../components/MovieCard';
import { SearchBar } from '../components/SearchBar';

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

  return (
    <View style={styles.container}>
      <SearchBar value={searchTerm} onChange={handleSearch} />
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      
      {loading ? (
        <View style={styles.centerContainer}>
          <Text>Loading...</Text>
        </View>
      ) : searchResults.length === 0 && !error && searchTerm.length >= 3 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.noResultsText}>No movies found</Text>
        </View>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.imdbID}
          renderItem={({ item }) => <MovieCard movie={item} />}
          numColumns={2}
          contentContainerStyle={styles.gridContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#c62828',
    textAlign: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
  },
  gridContainer: {
    padding: 8,
  }
});
