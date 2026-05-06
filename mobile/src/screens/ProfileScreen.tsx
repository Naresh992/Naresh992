import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Header } from '../components/Header';
import { colors, radius, spacing, typography } from '../styles/theme';

export function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <Header title="PROFILE" />
      <View style={styles.content}>
        <View style={styles.identityCard}>
          <View style={styles.avatar}><Text style={styles.initial}>R</Text></View>
          <View style={styles.identityCopy}>
            <Text style={styles.name}>Raritone Member</Text>
            <Text style={styles.email}>member@raritone.app</Text>
          </View>
        </View>
        <View style={styles.measureCard}>
          <Text style={styles.sectionTitle}>Measurement Snapshot</Text>
          <View style={styles.measureRow}><Text style={styles.measureLabel}>Version</Text><Text style={styles.measureValue}>v1.0</Text></View>
          <View style={styles.measureRow}><Text style={styles.measureLabel}>Height</Text><Text style={styles.measureValue}>175 cm</Text></View>
          <View style={styles.measureRow}><Text style={styles.measureLabel}>Chest</Text><Text style={styles.measureValue}>34 in</Text></View>
          <View style={styles.measureRow}><Text style={styles.measureLabel}>Waist</Text><Text style={styles.measureValue}>28 in</Text></View>
        </View>
        <View style={styles.menuCard}>
          {['Orders', 'Saved products', 'Privacy controls', 'Help center'].map((item) => (
            <View key={item} style={styles.menuRow}>
              <Text style={styles.menuText}>{item}</Text>
              <Text style={styles.chevron}>›</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.xl,
    gap: spacing.xl,
  },
  identityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.xl,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: {
    ...typography.h1,
    color: colors.inverse,
  },
  identityCopy: {
    flex: 1,
  },
  name: {
    ...typography.h2,
    color: colors.text,
  },
  email: {
    ...typography.body,
    color: colors.muted,
    marginTop: spacing.xs,
  },
  measureCard: {
    borderRadius: radius.xl,
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    gap: spacing.lg,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.text,
  },
  measureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: spacing.md,
  },
  measureLabel: {
    ...typography.body,
    color: colors.muted,
  },
  measureValue: {
    ...typography.bodyStrong,
    color: colors.text,
  },
  menuCard: {
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  menuRow: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuText: {
    ...typography.bodyStrong,
    color: colors.text,
  },
  chevron: {
    color: colors.muted,
    fontSize: 26,
  },
});
