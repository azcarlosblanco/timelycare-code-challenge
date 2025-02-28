import React from 'react';
import { View, Text, FlatList, StyleSheet, ListRenderItem } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../types/store';
import { MovieCard } from '../components/MovieCard';
import { Movie } from '../types/movie';

export const FavoritesScreen: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.movies.favorites);

  const renderItem: ListRenderItem<Movie> = ({ item }) => <MovieCard movie={item} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Favorite Movies</Text>
      
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorite movies yet</Text>
      ) : (
        <FlatList<Movie>
          data={favorites}
          keyExtractor={(item) => item.imdbID}
          renderItem={renderItem}
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
