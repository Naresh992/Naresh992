import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { colors, radius, spacing, typography } from '../styles/theme';

type Props = { onTryOn: () => void; onProfile: () => void };

export function AvatarScreen({ onTryOn, onProfile }: Props) {
  return (
    <View style={styles.screen}>
      <Header title="AVATAR" subtitle="Measurement profile" onProfile={onProfile} />
      <View style={styles.stage}>
        <View style={styles.avatarHead} />
        <View style={styles.avatarBody} />
        <View style={styles.avatarLegs}>
          <View style={styles.avatarLeg} />
          <View style={styles.avatarLeg} />
        </View>
      </View>
      <View style={styles.panel}>
        <View style={styles.tabs}>
          <Text style={styles.tabActive}>Avatar</Text>
          <Text style={styles.tab}>Fashion</Text>
          <Text style={styles.tab}>Settings</Text>
        </View>
        <View style={styles.measurements}>
          <Metric value="175" label="Height" />
          <Metric value="34" label="Chest" />
          <Metric value="28" label="Waist" />
        </View>
        <Button title="Start Virtual Try-On" onPress={onTryOn} />
      </View>
    </View>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.metric}>
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
  stage: {
    flex: 1,
    margin: spacing.lg,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarHead: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.text,
    marginBottom: spacing.md,
  },
  avatarBody: {
    width: 140,
    height: 188,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.text,
  },
  avatarLegs: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginTop: spacing.sm,
  },
  avatarLeg: {
    width: 46,
    height: 118,
    borderRadius: radius.md,
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
  panel: {
    padding: spacing.xl,
    gap: spacing.lg,
    backgroundColor: colors.elevated,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
  },
  tabs: {
    flexDirection: 'row',
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    padding: spacing.xs,
  },
  tabActive: {
    flex: 1,
    borderRadius: radius.pill,
    backgroundColor: colors.text,
    color: colors.inverse,
    textAlign: 'center',
    paddingVertical: spacing.md,
    ...typography.caption,
  },
  tab: {
    flex: 1,
    color: colors.muted,
    textAlign: 'center',
    paddingVertical: spacing.md,
    ...typography.caption,
  },
  measurements: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  metric: {
    flex: 1,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    alignItems: 'center',
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
});
