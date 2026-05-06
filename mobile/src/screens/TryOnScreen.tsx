import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/Button';
import { Product, products } from '../data/products';
import { colors, radius, spacing, typography } from '../styles/theme';

type Props = { product: Product; onBack: () => void };

export function TryOnScreen({ product }: Props) {
  const [selectedOutfit, setSelectedOutfit] = useState(product);

  return (
    <View style={styles.screen}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>TRY-ON</Text>
        <Text style={styles.headerMeta}>{selectedOutfit.title}</Text>
      </View>
      <View style={styles.avatarBox}>
        <View style={styles.avatarHead} />
        <View style={[styles.outfitBody, { backgroundColor: selectedOutfit.color, borderColor: selectedOutfit.accent }]}>
          <View style={[styles.outfitLine, { backgroundColor: selectedOutfit.accent }]} />
        </View>
        <View style={styles.legsRow}>
          <View style={styles.leg} />
          <View style={styles.leg} />
        </View>
        <View style={styles.fitBadge}>
          <Text style={styles.fitValue}>98%</Text>
          <Text style={styles.fitText}>Fit</Text>
        </View>
      </View>
      <View style={styles.bottomPanel}>
        <Text style={styles.panelTitle}>Outfits</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sliderContent}>
          {products.map((item) => (
            <Text
              key={item.id}
              onPress={() => setSelectedOutfit(item)}
              style={[styles.outfitChip, selectedOutfit.id === item.id && styles.outfitChipActive]}
            >
              {item.title}
            </Text>
          ))}
        </ScrollView>
        <View style={styles.buttonRow}>
          <Button title="Save" variant="secondary" style={styles.actionButton} />
          <Button title="Buy" style={styles.actionButton} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  headerRow: {
    minHeight: 64,
    justifyContent: 'center',
    gap: spacing.xs,
  },
  headerTitle: {
    ...typography.caption,
    color: colors.muted,
    letterSpacing: 2,
  },
  headerMeta: {
    ...typography.heading,
    color: colors.text,
  },
  avatarBox: {
    flex: 1,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  avatarHead: {
    width: 66,
    height: 66,
    borderRadius: radius.pill,
    backgroundColor: colors.text,
    marginBottom: spacing.md,
  },
  outfitBody: {
    width: 154,
    height: 210,
    borderRadius: radius.lg,
    borderTopLeftRadius: 76,
    borderTopRightRadius: 76,
    borderWidth: 3,
    alignItems: 'center',
  },
  outfitLine: {
    width: 4,
    height: 170,
    borderRadius: radius.pill,
    marginTop: spacing.lg,
  },
  legsRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginTop: spacing.sm,
  },
  leg: {
    width: 44,
    height: 112,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  fitBadge: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.text,
    padding: spacing.md,
    alignItems: 'center',
  },
  fitValue: {
    ...typography.heading,
    color: colors.inverse,
  },
  fitText: {
    ...typography.caption,
    color: colors.inverse,
  },
  bottomPanel: {
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.lg,
  },
  panelTitle: {
    ...typography.heading,
    color: colors.text,
  },
  sliderContent: {
    gap: spacing.sm,
    paddingRight: spacing.lg,
  },
  outfitChip: {
    ...typography.body,
    color: colors.text,
    backgroundColor: colors.card,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    overflow: 'hidden',
  },
  outfitChipActive: {
    color: colors.inverse,
    backgroundColor: colors.text,
    borderColor: colors.text,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  actionButton: {
    flex: 1,
  },
});
