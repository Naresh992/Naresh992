import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Header } from '../components/Header';
import { colors, radius, spacing, typography } from '../styles/theme';

export function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <Header title="PROFILE" />
      <View style={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>R</Text>
          </View>
          <View style={styles.profileCopy}>
            <Text style={styles.name}>Raritone Member</Text>
            <Text style={styles.email}>member@raritone.app</Text>
          </View>
        </View>
        <View style={styles.measureCard}>
          <Text style={styles.sectionTitle}>Body Profile</Text>
          <Row label="Scan version" value="v1.0" />
          <Row label="Height" value="175 cm" />
          <Row label="Chest" value="34 in" />
          <Row label="Waist" value="28 in" />
        </View>
        <View style={styles.menuCard}>
          <Row label="Orders" value="›" />
          <Row label="Saved products" value="›" />
          <Row label="Privacy" value="›" />
          <Row label="Support" value="›" />
        </View>
      </View>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
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
    padding: spacing.lg,
    gap: spacing.lg,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.lg,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: radius.pill,
    backgroundColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...typography.heading,
    color: colors.inverse,
  },
  profileCopy: {
    flex: 1,
  },
  name: {
    ...typography.heading,
    color: colors.text,
  },
  email: {
    ...typography.body,
    color: colors.muted,
    marginTop: spacing.xs,
  },
  measureCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    gap: spacing.md,
  },
  menuCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    gap: spacing.md,
  },
  sectionTitle: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  row: {
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowLabel: {
    ...typography.body,
    color: colors.muted,
  },
  rowValue: {
    ...typography.body,
    color: colors.text,
  },
});
