import React, { useEffect } from 'react';
import { Animated } from 'react-native';

export const FadeInView: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      {children}
    </Animated.View>
  );
}; 