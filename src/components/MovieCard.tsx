import React, { useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Movie } from '../types/movie';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../store/moviesSlice';
import { RootState } from '../types/store';
import { MovieCardProps } from '../types/components';

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.movies.favorites);
  const isFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(movie));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

  const handleFavoritePress = () => {
    handleFavoriteClick();
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1.2,
        useNativeDriver: true,
        friction: 3,
        tension: 200,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 3,
        tension: 200,
      })
    ]).start();
  };

  return (
      <View 
        style={styles.card}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`Movie: ${movie.Title}, Released in ${movie.Year}`}
      >
        <Image 
          source={{ uri: movie.Poster }} 
          style={styles.image}
          accessible={true}
          accessibilityRole="image"
          accessibilityLabel={`Movie poster for ${movie.Title}`}
        />
        <View style={styles.content}>
          <Text 
            style={styles.title}
            accessibilityRole="header"
          >
            {movie.Title}
          </Text>
          <Text 
            style={styles.year}
            accessibilityLabel={`Released in ${movie.Year}`}
          >
            {movie.Year}
          </Text>
          <Animated.View style={[
            styles.favoriteButton,
            { transform: [{ scale: scaleAnim }] }
          ]}>
            <TouchableOpacity 
              onPress={handleFavoritePress}
              style={styles.favoriteButtonInner}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={isFavorite ? `Remove ${movie.Title} from favorites` : `Add ${movie.Title} to favorites`}
            >
              <Icon 
                name={isFavorite ? "favorite" : "favorite-border"} 
                size={24} 
                color={isFavorite ? "#dc004e" : "#666"} 
              />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  year: {
    fontSize: 14,
    color: '#666',
  },
  favoriteButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
    padding: 4,
  },
  favoriteButtonInner: {
    position: 'absolute',
    right: 8,
    top: 8,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 20,
    padding: 4,
  },
});
