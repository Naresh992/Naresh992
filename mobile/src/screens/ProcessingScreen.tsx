import React, { useEffect } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../styles/theme';

type Props = { onComplete: () => void };

export function ProcessingScreen({ onComplete }: Props) {
  const progress = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, { toValue: 1, duration: 1500, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start(() => onComplete());
  }, [onComplete, progress]);

  const width = progress.interpolate({ inputRange: [0, 1], outputRange: ['8%', '100%'] });

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Generating your avatar</Text>
      <Text style={styles.subtitle}>Building body measurements, avatar proportions, and try-on anchors.</Text>
      <View style={styles.progressTrack}><Animated.View style={[styles.progressFill, { width }]} /></View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, padding: spacing.xl, justifyContent: 'center', gap: spacing.lg },
  title: { ...typography.h1, color: colors.text, textAlign: 'center' },
  subtitle: { ...typography.body, color: colors.muted, textAlign: 'center' },
  progressTrack: { height: 8, borderRadius: 4, backgroundColor: colors.surface, overflow: 'hidden' },
  progressFill: { height: 8, borderRadius: 4, backgroundColor: colors.text },
});
