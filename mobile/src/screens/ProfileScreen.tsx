import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { defaultAvatarProfile, fitGarmentToAvatar } from '../avatar/avatarEngine';
import { AvatarViewer } from '../components/AvatarViewer';
import { Header } from '../components/Header';
import { products } from '../data/products';
import { colors, radius, spacing, typography } from '../styles/theme';

const savedGarments = [fitGarmentToAvatar(products[0], defaultAvatarProfile), fitGarmentToAvatar(products[3], defaultAvatarProfile)];

export function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <Header title="PROFILE" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>R</Text>
          </View>
          <View style={styles.profileCopy}>
            <Text style={styles.name}>Raritone Member</Text>
            <Text style={styles.email}>member@raritone.app</Text>
          </View>
        </View>
        <View style={styles.previewCard}>
          <Text style={styles.sectionTitle}>Digital Avatar</Text>
          <AvatarViewer profile={defaultAvatarProfile} garments={savedGarments} />
        </View>
        <View style={styles.measureCard}>
          <Text style={styles.sectionTitle}>Body Profile</Text>
          <Row label="Scan version" value="v1.0" />
          <Row label="Height" value="175 cm" />
          <Row label="Chest" value="86 cm" />
          <Row label="Waist" value="71 cm" />
          <Row label="Hips" value="96 cm" />
        </View>
        <View style={styles.menuCard}>
          <Row label="Saved outfits" value="2" />
          <Row label="Wardrobe" value="8" />
          <Row label="Favorites" value="6" />
          <Row label="Privacy" value="›" />
        </View>
      </ScrollView>
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
    padding: spacing.xl,
    gap: spacing.lg,
    paddingBottom: spacing.xxxl,
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
  previewCard: {
    minHeight: 520,
    gap: spacing.md,
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
    ...typography.bodyMedium,
    color: colors.text,
  },
});
