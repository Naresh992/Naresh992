import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { colors, radius, spacing, typography } from '../styles/theme';

type Props = { onGetStarted: () => void };

export function OnboardingScreen({ onGetStarted }: Props) {
  return (
    <View style={styles.screen}>
      <View style={styles.heroGrid}>
        <View style={[styles.heroTile, styles.tileTall]}><Text style={styles.tileEmoji}>🧥</Text></View>
        <View style={styles.heroTile}><Text style={styles.tileEmoji}>👟</Text></View>
        <View style={styles.heroTile}><Text style={styles.tileEmoji}>⌚</Text></View>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Curated for You</Text>
        <Text style={styles.body}>Scan once. Create your avatar. Try clothes, shoes, jewellery, and accessories instantly.</Text>
        <View style={styles.dots}><View style={styles.activeDot} /><View style={styles.dot} /><View style={styles.dot} /></View>
        <Button title="Get Started" onPress={onGetStarted} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, padding: spacing.xl, justifyContent: 'flex-end' },
  heroGrid: { flex: 1, flexDirection: 'row', gap: spacing.md, alignItems: 'center' },
  heroTile: { flex: 1, height: 220, borderRadius: radius.lg, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border },
  tileTall: { height: 360 },
  tileEmoji: { fontSize: 58 },
  card: { backgroundColor: colors.elevated, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border, padding: spacing.xl, gap: spacing.md },
  title: { ...typography.h1, color: colors.text, textAlign: 'center' },
  body: { ...typography.body, color: colors.muted, textAlign: 'center' },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: spacing.xs },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.subtle },
  activeDot: { width: 24, height: 6, borderRadius: 3, backgroundColor: colors.text },
});
