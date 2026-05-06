import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/Button';
import { colors, radius, spacing, typography } from '../styles/theme';

type Props = { onComplete: () => void };

export function ProcessingScreen({ onComplete }: Props) {
  return (
    <View style={styles.screen}>
      <View style={styles.loader}>
        <View style={styles.ring}>
          <Text style={styles.percent}>86%</Text>
        </View>
      </View>
      <View style={styles.copy}>
        <Text style={styles.kicker}>GENERATING AVATAR</Text>
        <Text style={styles.title}>Building your measurement snapshot.</Text>
        <Text style={styles.subtitle}>We are creating a reproducible avatar profile for try-on previews.</Text>
      </View>
      <Button title="Finish Processing" onPress={onComplete} />
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
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    width: 210,
    height: 210,
    borderRadius: 105,
    borderWidth: 14,
    borderColor: colors.text,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  percent: {
    ...typography.display,
    color: colors.text,
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
    ...typography.hero,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.muted,
  },
});
