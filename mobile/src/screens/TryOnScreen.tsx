import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/Button';
import { Product, products } from '../data/products';
import { colors, radius, shadows, spacing, typography } from '../styles/theme';

type Props = { product: Product; onBack: () => void };

export function TryOnScreen({ product }: Props) {
  const [selectedOutfit, setSelectedOutfit] = useState(product);

  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.eyebrow}>LIVE FIT PREVIEW</Text>
          <Text style={styles.title}>Virtual Try-On</Text>
        </View>
        <View style={styles.fitPill}>
          <Text style={styles.fitPillText}>98%</Text>
        </View>
      </View>

      <View style={styles.avatarFrame}>
        <View style={styles.frameGlow} />
        <View style={styles.avatarBox}>
          <View style={styles.avatarHead} />
          <View style={[styles.outfitBody, { backgroundColor: selectedOutfit.color, borderColor: selectedOutfit.accent }]}>
            <View style={[styles.outfitLine, { backgroundColor: selectedOutfit.accent }]} />
          </View>
          <View style={styles.legsRow}>
            <View style={styles.leg} />
            <View style={styles.leg} />
          </View>
        </View>
        <View style={styles.lookMetaCard}>
          <Text style={styles.lookTitle}>{selectedOutfit.title}</Text>
          <Text style={styles.lookSubtitle}>{selectedOutfit.category} · Best size M</Text>
        </View>
      </View>

      <View style={styles.bottomPanel}>
        <View style={styles.panelHeader}>
          <Text style={styles.panelTitle}>Outfit rail</Text>
          <Text style={styles.panelAction}>Swipe</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sliderContent}>
          {products.map((item) => {
            const isSelected = selectedOutfit.id === item.id;
            return (
              <Pressable
                key={item.id}
                onPress={() => setSelectedOutfit(item)}
                style={({ pressed }) => [styles.outfitCard, isSelected && styles.outfitCardActive, pressed && styles.pressed]}
              >
                <View style={[styles.outfitSwatch, { backgroundColor: item.color }]} />
                <Text numberOfLines={1} style={[styles.outfitName, isSelected && styles.outfitNameActive]}>{item.title}</Text>
                <Text style={[styles.outfitPrice, isSelected && styles.outfitPriceActive]}>${item.price}</Text>
              </Pressable>
            );
          })}
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
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  topBar: {
    minHeight: 92,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eyebrow: {
    ...typography.micro,
    color: colors.muted,
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  fitPill: {
    minWidth: 58,
    height: 42,
    borderRadius: radius.pill,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  fitPillText: {
    ...typography.caption,
    color: colors.inverse,
  },
  avatarFrame: {
    flex: 1,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    ...shadows.soft,
  },
  frameGlow: {
    position: 'absolute',
    width: 290,
    height: 290,
    borderRadius: 145,
    backgroundColor: 'rgba(255,255,255,0.08)',
    top: '12%',
  },
  avatarBox: {
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ scale: 1.03 }],
  },
  avatarHead: {
    width: 66,
    height: 66,
    borderRadius: radius.pill,
    backgroundColor: colors.text,
    marginBottom: spacing.md,
  },
  outfitBody: {
    width: 160,
    height: 218,
    borderRadius: radius.lg,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    borderWidth: 3,
    alignItems: 'center',
  },
  outfitLine: {
    width: 4,
    height: 178,
    borderRadius: radius.pill,
    marginTop: spacing.lg,
  },
  legsRow: {
    flexDirection: 'row',
    gap: spacing.xl,
    marginTop: spacing.sm,
  },
  leg: {
    width: 46,
    height: 116,
    borderRadius: radius.md,
    backgroundColor: colors.cardElevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
  lookMetaCard: {
    position: 'absolute',
    left: spacing.xl,
    right: spacing.xl,
    bottom: spacing.xl,
    borderRadius: radius.lg,
    backgroundColor: 'rgba(0,0,0,0.72)',
    borderWidth: 1,
    borderColor: colors.borderStrong,
    padding: spacing.lg,
  },
  lookTitle: {
    ...typography.subheading,
    color: colors.text,
  },
  lookSubtitle: {
    ...typography.caption,
    color: colors.muted,
    marginTop: spacing.xs,
  },
  bottomPanel: {
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.lg,
  },
  panelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  panelTitle: {
    ...typography.heading,
    color: colors.text,
  },
  panelAction: {
    ...typography.caption,
    color: colors.muted,
  },
  sliderContent: {
    gap: spacing.md,
    paddingRight: spacing.xl,
  },
  outfitCard: {
    width: 132,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    padding: spacing.md,
    gap: spacing.sm,
  },
  outfitCardActive: {
    backgroundColor: colors.text,
    borderColor: colors.text,
  },
  outfitSwatch: {
    height: 58,
    borderRadius: radius.md,
  },
  outfitName: {
    ...typography.caption,
    color: colors.text,
  },
  outfitNameActive: {
    color: colors.inverse,
  },
  outfitPrice: {
    ...typography.caption,
    color: colors.muted,
  },
  outfitPriceActive: {
    color: colors.inverse,
  },
  pressed: {
    opacity: 0.78,
    transform: [{ scale: 0.97 }],
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  actionButton: {
    flex: 1,
    borderRadius: radius.lg,
  },
});
