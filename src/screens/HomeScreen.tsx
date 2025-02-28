import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovies } from '../store/moviesSlice';
import { RootState, AppDispatch } from '../store/store';
import { MovieCard } from '../components/MovieCard';
import { SearchBar } from '../components/SearchBar';

export const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { searchResults, loading, error } = useSelector((state: RootState) => state.movies);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    debugger
    if (value.length >= 3) {
      dispatch(searchMovies(value));
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar value={searchTerm} onChange={handleSearch} />
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
      
      {loading ? (
        <Text>Loading...</Text>
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
  errorText: {
    color: 'red',
    marginVertical: 8,
  },
  gridContainer: {
    padding: 8,
  },
});
