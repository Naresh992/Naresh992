import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/Button';
import { colors, radius, spacing, typography } from '../styles/theme';

type Props = { onGetStarted: () => void };

export function OnboardingScreen({ onGetStarted }: Props) {
  return (
    <View style={styles.screen}>
      <View style={styles.heroCard}>
        <View style={styles.scanFrame}>
          <View style={styles.avatarHead} />
          <View style={styles.avatarTorso} />
          <View style={styles.scanLine} />
        </View>
        <View style={styles.metricsRow}>
          <View style={styles.metric}><Text style={styles.metricValue}>98%</Text><Text style={styles.metricLabel}>Fit match</Text></View>
          <View style={styles.metric}><Text style={styles.metricValue}>3D</Text><Text style={styles.metricLabel}>Avatar</Text></View>
        </View>
      </View>
      <View style={styles.copy}>
        <Text style={styles.kicker}>BODY-FIRST SHOPPING</Text>
        <Text style={styles.title}>See the fit before you buy.</Text>
        <Text style={styles.subtitle}>Raritone turns body measurements into a reusable avatar for fast, realistic virtual try-on previews.</Text>
      </View>
      <Button title="Get Started" onPress={onGetStarted} />
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
  heroCard: {
    flex: 1,
    maxHeight: 470,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    justifyContent: 'space-between',
    marginTop: spacing.xl,
  },
  scanFrame: {
    flex: 1,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarHead: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.text,
    marginBottom: spacing.md,
  },
  avatarTorso: {
    width: 132,
    height: 188,
    borderTopLeftRadius: 62,
    borderTopRightRadius: 62,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.text,
  },
  scanLine: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    height: 2,
    backgroundColor: colors.text,
    opacity: 0.8,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  metric: {
    flex: 1,
    borderRadius: radius.lg,
    backgroundColor: colors.elevated,
    padding: spacing.lg,
  },
  metricValue: {
    ...typography.h2,
    color: colors.text,
  },
  metricLabel: {
    ...typography.caption,
    color: colors.muted,
    marginTop: spacing.xs,
  },
  copy: {
    gap: spacing.md,
    marginVertical: spacing.xxl,
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
