import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { MovieCard } from '../components/MovieCard';

export const FavoritesScreen = () => {
  const favorites = useSelector((state: RootState) => state.movies.favorites);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Favorite Movies</Text>
      
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorite movies yet</Text>
      ) : (
        <FlatList
          data={favorites}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 32,
  },
  gridContainer: {
    padding: 8,
  },
});
