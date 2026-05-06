import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { colors, radius, spacing, typography } from '../styles/theme';

type Props = { onScan: () => void; onBack: () => void };

export function BodyScanScreen({ onScan, onBack }: Props) {
  return (
    <View style={styles.screen}>
      <Header showBack onBack={onBack} />
      <View style={styles.cameraFrame}>
        <View style={styles.grid} />
        <View style={styles.bodyGuide}><Text style={styles.bodyIcon}>🧍</Text></View>
      </View>
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <Text style={styles.title}>Create your 3D Figure</Text>
        <Text style={styles.subtitle}>Stand in good light. We’ll capture proportions and save your measurements securely.</Text>
        <Button title="Scan Body" onPress={onScan} />
        <Button title="Upload Photo" variant="secondary" style={styles.secondary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  cameraFrame: { flex: 1, margin: spacing.lg, borderRadius: radius.xl, backgroundColor: colors.surface, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border },
  grid: { ...StyleSheet.absoluteFillObject, borderWidth: 1, borderColor: colors.border, opacity: 0.7 },
  bodyGuide: { width: 170, height: 360, borderRadius: 90, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  bodyIcon: { fontSize: 110 },
  sheet: { padding: spacing.xl, borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.xl, backgroundColor: colors.elevated, gap: spacing.md, borderWidth: 1, borderColor: colors.border },
  handle: { width: 48, height: 5, borderRadius: 3, backgroundColor: colors.border, alignSelf: 'center', marginBottom: spacing.sm },
  title: { ...typography.h1, color: colors.text, textAlign: 'center' },
  subtitle: { ...typography.body, color: colors.muted, textAlign: 'center' },
  secondary: { marginTop: spacing.sm },
});
