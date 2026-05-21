import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { defaultAvatarProfile } from '../avatar/avatarEngine';
import { AvatarViewer } from '../components/AvatarViewer';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { colors, radius, spacing, typography } from '../styles/theme';

type Props = { onTryOn: () => void; onProfile: () => void };

const skinTones = ['#F1C6A8', '#C58C67', '#8D5A3B', '#5C3828'];
const presets = ['Female', 'Male', 'Streetwear', 'Runway'];

export function AvatarScreen({ onTryOn, onProfile }: Props) {
  return (
    <View style={styles.screen}>
      <Header title="AVATAR" onProfile={onProfile} />
      <View style={styles.content}>
        <AvatarViewer profile={defaultAvatarProfile} />
        <View style={styles.personalizePanel}>
          <View style={styles.panelHeader}>
            <Text style={styles.sectionTitle}>Avatar personalization</Text>
            <Text style={styles.sectionAction}>Rigged GLB</Text>
          </View>
          <View style={styles.optionRow}>
            {presets.map((preset) => <Pressable key={preset} style={styles.optionPill}><Text style={styles.optionText}>{preset}</Text></Pressable>)}
          </View>
          <View style={styles.skinRow}>
            {skinTones.map((tone) => <View key={tone} style={[styles.skinTone, { backgroundColor: tone }]} />)}
          </View>
        </View>
        <View style={styles.metricsRow}>
          <Metric value="175" label="Height" />
          <Metric value="86" label="Chest" />
          <Metric value="71" label="Waist" />
          <Metric value="96" label="Hips" />
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
    padding: spacing.xl,
    gap: spacing.lg,
  },
  personalizePanel: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    gap: spacing.md,
  },
  panelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    ...typography.subheading,
    color: colors.text,
  },
  sectionAction: {
    ...typography.caption,
    color: colors.muted,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  optionPill: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.card,
  },
  optionText: {
    ...typography.caption,
    color: colors.text,
  },
  skinRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  skinTone: {
    width: 34,
    height: 34,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.text,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  metricCard: {
    flex: 1,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.md,
    alignItems: 'center',
  },
  metricValue: {
    ...typography.subheading,
    color: colors.text,
  },
  metricLabel: {
    ...typography.micro,
    color: colors.muted,
    marginTop: spacing.xs,
  },
});
