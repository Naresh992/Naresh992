import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../styles/theme';

type Props = {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  onProfile?: () => void;
};

export function Header({ title = 'RARITONE', showBack = false, onBack, onProfile }: Props) {
  return (
    <View style={styles.header}>
      <View style={styles.side}>
        {showBack ? (
          <Pressable onPress={onBack} style={styles.iconButton}>
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>
        ) : (
          <View style={styles.logoMark} />
        )}
      </View>
      <Text style={styles.logo}>{title}</Text>
      <View style={styles.sideRight}>
        {onProfile ? (
          <Pressable onPress={onProfile} style={styles.profileButton}>
            <Text style={styles.profileText}>R</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    justifyContent: 'space-between',
    backgroundColor: colors.background,
  },
  side: {
    width: 48,
    alignItems: 'flex-start',
  },
  sideRight: {
    width: 48,
    alignItems: 'flex-end',
  },
  logoMark: {
    width: 14,
    height: 14,
    borderRadius: radius.pill,
    backgroundColor: colors.text,
  },
  logo: {
    ...typography.caption,
    color: colors.text,
    letterSpacing: 2.4,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    color: colors.text,
    fontSize: 34,
    lineHeight: 36,
  },
  profileButton: {
    width: 42,
    height: 42,
    borderRadius: radius.pill,
    backgroundColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    ...typography.caption,
    color: colors.inverse,
  },
});
