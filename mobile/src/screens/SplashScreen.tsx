import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/Button';
import { colors, radius, spacing, typography } from '../styles/theme';

type Props = { onContinue: () => void };

export function SplashScreen({ onContinue }: Props) {
  return (
    <View style={styles.screen}>
      <View style={styles.markWrap}>
        <View style={styles.outerRing}>
          <View style={styles.innerRing}>
            <Text style={styles.mark}>R</Text>
          </View>
        </View>
      </View>
      <View style={styles.copy}>
        <Text style={styles.kicker}>AI VIRTUAL TRY-ON</Text>
        <Text style={styles.title}>RARITONE</Text>
        <Text style={styles.subtitle}>Scan once. Try every product with confidence.</Text>
      </View>
      <Button title="Start" onPress={onContinue} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.xl,
    justifyContent: 'space-between',
  },
  markWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerRing: {
    width: 210,
    height: 210,
    borderRadius: 105,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerRing: {
    width: 142,
    height: 142,
    borderRadius: 71,
    backgroundColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mark: {
    ...typography.display,
    color: colors.inverse,
  },
  copy: {
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
  kicker: {
    ...typography.micro,
    color: colors.muted,
  },
  title: {
    ...typography.display,
    color: colors.text,
    letterSpacing: 5,
  },
  subtitle: {
    ...typography.body,
    color: colors.muted,
    maxWidth: 270,
  },
  button: {
    marginBottom: spacing.lg,
    borderRadius: radius.pill,
  },
});
