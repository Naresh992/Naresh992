import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { colors, radius, spacing, typography } from '../../theme/tokens';

export function LoginOtpScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in to Raritone</Text>
      <Text style={styles.subtitle}>Enter your email to receive OTP</Text>

      <TextInput
        placeholder="you@example.com"
        placeholderTextColor={colors.secondaryText}
        style={styles.input}
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.cta}>
        <Text style={styles.ctaText}>Send OTP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', gap: spacing.md },
  title: { ...typography.heading2, color: colors.primaryText },
  subtitle: { ...typography.body, color: colors.secondaryText },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    color: colors.primaryText,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
  },
  cta: {
    marginTop: spacing.sm,
    backgroundColor: colors.primaryText,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  ctaText: { ...typography.title, color: colors.background },
});
