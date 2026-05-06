import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

import { colors, radius, spacing, typography } from '../styles/theme';

type Props = {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  loading?: boolean;
  style?: ViewStyle;
};

export function Button({ title, onPress, variant = 'primary', loading = false, style }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.82}
      onPress={onPress}
      disabled={loading}
      style={[styles.base, styles[variant], style]}
    >
      {loading ? <ActivityIndicator color={variant === 'primary' ? colors.inverse : colors.text} /> : <Text style={[styles.text, styles[`${variant}Text`]]}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 56,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  primary: { backgroundColor: colors.accent },
  secondary: { backgroundColor: colors.elevated, borderWidth: 1, borderColor: colors.border },
  ghost: { backgroundColor: 'transparent' },
  text: { ...typography.button },
  primaryText: { color: colors.inverse },
  secondaryText: { color: colors.text },
  ghostText: { color: colors.text },
});
