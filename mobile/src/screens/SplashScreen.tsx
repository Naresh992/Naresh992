import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/Button';
import { colors, radius, spacing, typography } from '../styles/theme';

type Props = { onContinue: () => void };

export function SplashScreen({ onContinue }: Props) {
  return (
    <View style={styles.screen}>
      <View style={styles.brandWrap}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>R</Text>
        </View>
      </View>
      <View style={styles.copy}>
        <Text style={styles.eyebrow}>VIRTUAL TRY-ON</Text>
        <Text style={styles.title}>RARITONE</Text>
        <Text style={styles.subtitle}>Shop with an avatar that understands your fit.</Text>
      </View>
      <Button title="Start" onPress={onContinue} />
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
  brandWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    width: 148,
    height: 148,
    borderRadius: radius.pill,
    backgroundColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    ...typography.display,
    color: colors.inverse,
  },
  copy: {
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  eyebrow: {
    ...typography.caption,
    color: colors.muted,
    letterSpacing: 1.5,
  },
  title: {
    ...typography.display,
    color: colors.text,
    letterSpacing: 4,
  },
  subtitle: {
    ...typography.body,
    color: colors.muted,
  },
});
