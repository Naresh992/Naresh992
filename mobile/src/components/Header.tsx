import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors, spacing, typography } from '../styles/theme';

type Props = {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  onProfile?: () => void;
};

export function Header({ title = 'Raritone', showBack = false, onBack, onProfile }: Props) {
  return (
    <View style={styles.header}>
      {showBack ? (
        <TouchableOpacity onPress={onBack} activeOpacity={0.7} style={styles.iconButton}><Text style={styles.icon}>←</Text></TouchableOpacity>
      ) : (
        <Text style={styles.logo}>{title}</Text>
      )}
      <TouchableOpacity onPress={onProfile} activeOpacity={0.7} style={styles.profile}>
        <Text style={styles.profileText}>◎</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  logo: { ...typography.h2, color: colors.text, fontStyle: 'italic' },
  iconButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  icon: { color: colors.text, fontSize: 34, lineHeight: 36 },
  profile: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: { color: colors.text, fontSize: 18 },
});
