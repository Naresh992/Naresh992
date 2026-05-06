import React, { useEffect } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { colors, spacing, typography } from '../styles/theme';

type Props = { onContinue: () => void };

export function SplashScreen({ onContinue }: Props) {
  const fade = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 520, useNativeDriver: true }).start();
  }, [fade]);

  return (
    <View style={styles.screen}>
      <Animated.View style={[styles.content, { opacity: fade }]}>
        <Text style={styles.logo}>Raritone</Text>
        <Text style={styles.tagline}>AI virtual try-on for confident shopping.</Text>
      </Animated.View>
      <Button title="Enter" onPress={onContinue} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, padding: spacing.xl, justifyContent: 'space-between' },
  content: { flex: 1, justifyContent: 'center' },
  logo: { ...typography.hero, color: colors.text, fontStyle: 'italic' },
  tagline: { ...typography.body, color: colors.muted, marginTop: spacing.md, maxWidth: 260 },
});
