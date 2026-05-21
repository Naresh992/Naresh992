import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/Button';
import { colors, radius, spacing, typography } from '../styles/theme';

type Props = { onGetStarted: () => void };

export function OnboardingScreen({ onGetStarted }: Props) {
  return (
    <View style={styles.screen}>
      <View style={styles.previewCard}>
        <View style={styles.avatarHead} />
        <View style={styles.avatarBody} />
        <View style={styles.scanLine} />
      </View>
      <View style={styles.copy}>
        <Text style={styles.eyebrow}>SCAN · AVATAR · TRY ON</Text>
        <Text style={styles.title}>A fitting room in your pocket.</Text>
        <Text style={styles.subtitle}>Create a private body profile, preview outfits, and buy with confidence.</Text>
      </View>
      <Button title="Get Started" onPress={onGetStarted} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.background,
    justifyContent: 'space-between',
  },
  previewCard: {
    flex: 1,
    maxHeight: 470,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
    overflow: 'hidden',
  },
  avatarHead: {
    width: 72,
    height: 72,
    borderRadius: radius.pill,
    backgroundColor: colors.text,
    marginBottom: spacing.md,
  },
  avatarBody: {
    width: 144,
    height: 210,
    borderRadius: radius.lg,
    borderTopLeftRadius: 72,
    borderTopRightRadius: 72,
    borderWidth: 2,
    borderColor: colors.text,
    backgroundColor: colors.card,
  },
  scanLine: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    height: 2,
    backgroundColor: colors.text,
  },
  copy: {
    gap: spacing.sm,
    marginVertical: spacing.xl,
  },
  eyebrow: {
    ...typography.caption,
    color: colors.muted,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.muted,
  },
});
