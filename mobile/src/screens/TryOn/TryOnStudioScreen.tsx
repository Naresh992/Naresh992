import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors, radius, spacing, typography } from '../../theme/tokens';

export function TryOnStudioScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Try-On Studio</Text>
      <Text style={styles.subtitle}>Switch between 2D and 3D preview modes</Text>

      <View style={styles.modeRow}>
        <TouchableOpacity style={[styles.modeButton, styles.modeActive]}>
          <Text style={[styles.modeText, styles.modeTextActive]}>2D Mode</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modeButton}>
          <Text style={styles.modeText}>3D Mode</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.previewCard}>
        <Text style={styles.previewLabel}>Avatar + outfit preview area</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', gap: spacing.md },
  title: { ...typography.heading2, color: colors.primaryText },
  subtitle: { ...typography.body, color: colors.secondaryText },
  modeRow: { flexDirection: 'row', gap: spacing.sm },
  modeButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.round,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  modeActive: { backgroundColor: colors.primaryText, borderColor: colors.primaryText },
  modeText: { ...typography.body, color: colors.secondaryText },
  modeTextActive: { color: colors.background },
  previewCard: {
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    minHeight: 220,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewLabel: { ...typography.body, color: colors.secondaryText },
});
