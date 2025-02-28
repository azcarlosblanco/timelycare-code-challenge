import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MovieCardProps } from '../types/components';
import { useFavorites } from '../hooks/useFavorites';
import { theme } from '../utils/theme';

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { isFavorite, toggleFavorite } = useFavorites(movie);

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: movie.Poster }}
        style={styles.poster}
        accessibilityLabel={`Poster for ${movie.Title}`}
      />
      <TouchableOpacity
        onPress={toggleFavorite}
        style={styles.favoriteButton}
        accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        accessibilityRole="button"
      >
        <Icon
          name={isFavorite ? 'favorite' : 'favorite-border'}
          size={24}
          color={theme.colors.secondary}
        />
      </TouchableOpacity>
      <Text style={styles.title} numberOfLines={2}>{movie.Title}</Text>
      <Text style={styles.year}>{movie.Year}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  poster: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 8,
  },
  title: {
    padding: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  year: {
    padding: 8,
    paddingTop: 0,
    fontSize: 12,
    color: '#666',
  },
});
