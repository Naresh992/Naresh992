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
          <Pressable onPress={onBack} style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}>
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>
        ) : (
          <View style={styles.logoMark} />
        )}
      </View>
      <Text style={styles.logo}>{title}</Text>
      <View style={styles.sideRight}>
        {onProfile ? (
          <Pressable onPress={onProfile} style={({ pressed }) => [styles.profileButton, pressed && styles.pressed]}>
            <Text style={styles.profileText}>R</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
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
    width: 16,
    height: 16,
    borderRadius: radius.pill,
    backgroundColor: colors.text,
  },
  logo: {
    ...typography.caption,
    color: colors.text,
    letterSpacing: 3,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  backIcon: {
    color: colors.text,
    fontSize: 34,
    lineHeight: 36,
    marginTop: -2,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    ...typography.caption,
    color: colors.inverse,
  },
  pressed: {
    opacity: 0.72,
    transform: [{ scale: 0.96 }],
  },
});
