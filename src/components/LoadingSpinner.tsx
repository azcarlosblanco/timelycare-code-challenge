import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { theme } from '../utils/theme';
import { LoadingSpinnerProps } from '../types/components';

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = () => (
  <View 
    style={styles.container}
    accessible={true}
    accessibilityRole="progressbar"
    accessibilityLabel="Loading movies"
    accessibilityLiveRegion="polite"
  >
    <ActivityIndicator size="large" color={theme.colors.primary} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 