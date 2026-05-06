import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { colors, radius, spacing, typography } from '../styles/theme';

type Props = { onScan: () => void; onBack: () => void };

export function BodyScanScreen({ onScan, onBack }: Props) {
  return (
    <View style={styles.screen}>
      <Header title="BODY SCAN" showBack onBack={onBack} />
      <View style={styles.content}>
        <View style={styles.scanStage}>
          <View style={styles.cornerTopLeft} />
          <View style={styles.cornerTopRight} />
          <View style={styles.cornerBottomLeft} />
          <View style={styles.cornerBottomRight} />
          <View style={styles.personHead} />
          <View style={styles.personTorso} />
          <View style={styles.personLegs}>
            <View style={styles.leg} />
            <View style={styles.leg} />
          </View>
          <View style={styles.scanLine} />
        </View>
        <View style={styles.copy}>
          <Text style={styles.kicker}>STEP 1 OF 3</Text>
          <Text style={styles.title}>Create a private measurement snapshot.</Text>
          <Text style={styles.subtitle}>Stand in frame with good lighting. Measurements are versioned to keep avatar generation reproducible.</Text>
        </View>
        <View style={styles.instructions}>
          <Text style={styles.instruction}>• Keep full body visible</Text>
          <Text style={styles.instruction}>• Wear fitted clothing</Text>
          <Text style={styles.instruction}>• Rotate slowly when prompted</Text>
        </View>
        <Button title="Start Body Scan" onPress={onScan} />
      </View>
    </View>
  );
}

const cornerBase = {
  position: 'absolute' as const,
  width: 38,
  height: 38,
  borderColor: colors.text,
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.xl,
    gap: spacing.xl,
  },
  scanStage: {
    flex: 1,
    minHeight: 360,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cornerTopLeft: { ...cornerBase, top: spacing.lg, left: spacing.lg, borderTopWidth: 2, borderLeftWidth: 2 },
  cornerTopRight: { ...cornerBase, top: spacing.lg, right: spacing.lg, borderTopWidth: 2, borderRightWidth: 2 },
  cornerBottomLeft: { ...cornerBase, bottom: spacing.lg, left: spacing.lg, borderBottomWidth: 2, borderLeftWidth: 2 },
  cornerBottomRight: { ...cornerBase, bottom: spacing.lg, right: spacing.lg, borderBottomWidth: 2, borderRightWidth: 2 },
  personHead: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.text,
    marginBottom: spacing.md,
  },
  personTorso: {
    width: 116,
    height: 154,
    borderTopLeftRadius: 58,
    borderTopRightRadius: 58,
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.text,
    backgroundColor: colors.card,
  },
  personLegs: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  leg: {
    width: 42,
    height: 98,
    borderRadius: radius.md,
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
  scanLine: {
    position: 'absolute',
    left: spacing.xl,
    right: spacing.xl,
    top: '42%',
    height: 2,
    backgroundColor: colors.text,
  },
  copy: {
    gap: spacing.sm,
  },
  kicker: {
    ...typography.micro,
    color: colors.muted,
  },
  title: {
    ...typography.h1,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.muted,
  },
  instructions: {
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  instruction: {
    ...typography.body,
    color: colors.text,
  },
});
