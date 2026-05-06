import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { colors, radius, spacing, typography } from '../styles/theme';

type Props = { onTryOn: () => void; onProfile: () => void };

export function AvatarScreen({ onTryOn, onProfile }: Props) {
  return (
    <View style={styles.screen}>
      <Header title="AVATAR" onProfile={onProfile} />
      <View style={styles.content}>
        <View style={styles.avatarStage}>
          <View style={styles.avatarHead} />
          <View style={styles.avatarBody} />
          <View style={styles.legsRow}>
            <View style={styles.leg} />
            <View style={styles.leg} />
          </View>
        </View>
        <View style={styles.metricsRow}>
          <Metric value="175" label="Height" />
          <Metric value="34" label="Chest" />
          <Metric value="28" label="Waist" />
        </View>
        <Button title="Start Try-On" onPress={onTryOn} />
      </View>
    </View>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    gap: spacing.lg,
  },
  avatarStage: {
    flex: 1,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarHead: {
    width: 70,
    height: 70,
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
  legsRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginTop: spacing.sm,
  },
  leg: {
    width: 44,
    height: 120,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  metricCard: {
    flex: 1,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    alignItems: 'center',
  },
  metricValue: {
    ...typography.heading,
    color: colors.text,
  },
  metricLabel: {
    ...typography.caption,
    color: colors.muted,
    marginTop: spacing.xs,
  },
});
