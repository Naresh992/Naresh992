import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors, spacing, typography } from '../styles/theme';

type Props = {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  onProfile?: () => void;
};

export function Header({ title = 'RARITONE', subtitle, showBack = false, onBack, onProfile }: Props) {
  return (
    <View style={styles.header}>
      <View style={styles.leftSlot}>
        {showBack ? (
          <TouchableOpacity activeOpacity={0.8} onPress={onBack} style={styles.iconButton}>
            <Text style={styles.icon}>‹</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.brandDot} />
        )}
      </View>
      <View style={styles.titleBlock}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <View style={styles.rightSlot}>
        {onProfile ? (
          <TouchableOpacity activeOpacity={0.8} onPress={onProfile} style={styles.profileButton}>
            <Text style={styles.profileText}>R</Text>
          </TouchableOpacity>
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
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  leftSlot: {
    width: 48,
    alignItems: 'flex-start',
  },
  rightSlot: {
    width: 48,
    alignItems: 'flex-end',
  },
  brandDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.text,
  },
  titleBlock: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    ...typography.caption,
    color: colors.text,
    letterSpacing: 2.6,
  },
  subtitle: {
    ...typography.micro,
    color: colors.muted,
    marginTop: 2,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  icon: {
    color: colors.text,
    fontSize: 34,
    lineHeight: 36,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.elevated,
  },
  profileText: {
    ...typography.caption,
    color: colors.text,
  },
});
