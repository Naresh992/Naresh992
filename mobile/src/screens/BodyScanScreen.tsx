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
        <View style={styles.cameraBox}>
          <View style={styles.cornerTopLeft} />
          <View style={styles.cornerTopRight} />
          <View style={styles.cornerBottomLeft} />
          <View style={styles.cornerBottomRight} />
          <View style={styles.avatarHead} />
          <View style={styles.avatarBody} />
          <View style={styles.scanLine} />
        </View>
        <View style={styles.copy}>
          <Text style={styles.eyebrow}>STEP 1</Text>
          <Text style={styles.title}>Scan your body</Text>
          <Text style={styles.subtitle}>Stand straight in good lighting. Keep your full body inside the frame.</Text>
        </View>
        <View style={styles.checkList}>
          <Text style={styles.checkItem}>• Full body visible</Text>
          <Text style={styles.checkItem}>• Fitted clothing</Text>
          <Text style={styles.checkItem}>• Plain background</Text>
        </View>
        <Button title="Start Scan" onPress={onScan} />
      </View>
    </View>
  );
}

const corner = {
  position: 'absolute' as const,
  width: 40,
  height: 40,
  borderColor: colors.text,
};

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
  cameraBox: {
    flex: 1,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cornerTopLeft: {
    ...corner,
    top: spacing.lg,
    left: spacing.lg,
    borderTopWidth: 2,
    borderLeftWidth: 2,
  },
  cornerTopRight: {
    ...corner,
    top: spacing.lg,
    right: spacing.lg,
    borderTopWidth: 2,
    borderRightWidth: 2,
  },
  cornerBottomLeft: {
    ...corner,
    bottom: spacing.lg,
    left: spacing.lg,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },
  cornerBottomRight: {
    ...corner,
    bottom: spacing.lg,
    right: spacing.lg,
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  avatarHead: {
    width: 62,
    height: 62,
    borderRadius: radius.pill,
    backgroundColor: colors.text,
    marginBottom: spacing.md,
  },
  avatarBody: {
    width: 132,
    height: 220,
    borderRadius: radius.lg,
    borderTopLeftRadius: 66,
    borderTopRightRadius: 66,
    borderWidth: 2,
    borderColor: colors.text,
    backgroundColor: colors.card,
  },
  scanLine: {
    position: 'absolute',
    left: spacing.xl,
    right: spacing.xl,
    height: 2,
    backgroundColor: colors.text,
  },
  copy: {
    gap: spacing.sm,
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
  checkList: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  checkItem: {
    ...typography.body,
    color: colors.text,
  },
});
