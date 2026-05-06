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
  const textColor = variant === 'primary' ? colors.inverse : colors.text;

  return (
    <TouchableOpacity
      activeOpacity={0.82}
      disabled={loading}
      onPress={onPress}
      style={[styles.base, styles[variant], style]}
    >
      {loading ? <ActivityIndicator color={textColor} /> : <Text style={[styles.text, { color: textColor }]}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 58,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  primary: {
    backgroundColor: colors.accent,
  },
  secondary: {
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ghost: {
    minHeight: 44,
    backgroundColor: 'transparent',
  },
  text: {
    ...typography.button,
  },
});
