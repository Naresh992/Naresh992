import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

import { colors, radius, spacing, typography } from '../styles/theme';

type Props = TextInputProps & {
  label: string;
};

export function Input({ label, ...props }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor={colors.subtle}
        selectionColor={colors.text}
        style={styles.input}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.sm,
  },
  label: {
    ...typography.micro,
    color: colors.muted,
    textTransform: 'uppercase',
  },
  input: {
    minHeight: 58,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    color: colors.text,
    paddingHorizontal: spacing.lg,
    ...typography.bodyStrong,
  },
});
