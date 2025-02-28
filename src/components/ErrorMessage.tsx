import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../utils/theme';
import { ErrorMessageProps } from '../types/components';

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => (
  <View 
    style={styles.container}
    accessible={true}
    accessibilityRole="alert"
    accessibilityLabel={`Error: ${message}`}
  >
    <Icon 
      name="error-outline" 
      size={24} 
      color={theme.colors.secondary}
      importantForAccessibility="no" 
    />
    <Text style={styles.text}>{message}</Text>
    {onRetry && (
      <TouchableOpacity 
        style={styles.retryButton} 
        onPress={onRetry}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Retry search"
        accessibilityHint="Double tap to try searching again"
      >
        <Text style={styles.retryText}>Retry</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffebee',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    margin: 16,
  },
  text: {
    color: '#c62828',
    textAlign: 'center',
    marginTop: 8,
  },
  retryButton: {
    marginTop: 12,
    padding: 8,
    backgroundColor: theme.colors.secondary,
    borderRadius: 4,
  },
  retryText: {
    color: 'white',
    fontWeight: 'bold',
  },
}); 