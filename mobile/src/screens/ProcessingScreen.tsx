import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/Button';
import { colors, radius, spacing, typography } from '../styles/theme';

type Props = { onComplete: () => void };

export function ProcessingScreen({ onComplete }: Props) {
  return (
    <View style={styles.screen}>
      <View style={styles.loaderWrap}>
        <View style={styles.loaderCircle}>
          <Text style={styles.loaderText}>86%</Text>
        </View>
      </View>
      <View style={styles.copy}>
        <Text style={styles.eyebrow}>PROCESSING</Text>
        <Text style={styles.title}>Creating your avatar</Text>
        <Text style={styles.subtitle}>Measurements are being converted into a reusable try-on profile.</Text>
      </View>
      <Button title="Finish" onPress={onComplete} />
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
  loaderWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderCircle: {
    width: 170,
    height: 170,
    borderRadius: radius.pill,
    borderWidth: 12,
    borderColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  loaderText: {
    ...typography.display,
    color: colors.text,
  },
  copy: {
    gap: spacing.sm,
    marginBottom: spacing.xl,
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
