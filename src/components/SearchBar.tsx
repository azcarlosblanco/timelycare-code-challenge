import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SearchBarProps } from '../types/components';

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <View 
      style={styles.container}
      accessible={true}
      accessibilityRole="search"
    >
      <Icon 
        name="search" 
        size={24} 
        color="#666" 
        style={styles.icon}
        importantForAccessibility="no"
      />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder="Search movies..."
        placeholderTextColor="#666"
        accessibilityLabel="Search movies"
        accessibilityHint="Enter a movie title to search"
        accessibilityRole="search"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
});
