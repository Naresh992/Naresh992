import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { createSavedOutfit, defaultAvatarProfile, fitGarmentToAvatar, FittedGarment, SavedOutfit } from '../avatar/avatarEngine';
import { AvatarViewer } from '../components/AvatarViewer';
import { Button } from '../components/Button';
import { OutfitCarousel } from '../components/OutfitCarousel';
import { Product, products } from '../data/products';
import { colors, radius, shadows, spacing, typography } from '../styles/theme';

type Props = { product: Product; onBack: () => void };

export function TryOnScreen({ product, onBack }: Props) {
  const fittedProducts = useMemo(() => products.map((item) => fitGarmentToAvatar(item, defaultAvatarProfile)), []);
  const initialGarment = useMemo(() => fitGarmentToAvatar(product, defaultAvatarProfile), [product]);
  const [selectedOutfit, setSelectedOutfit] = useState<FittedGarment>(initialGarment);
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>([]);
  const activeLayers = useMemo(() => [selectedOutfit], [selectedOutfit]);

  function saveCurrentLook() {
    setSavedOutfits((items) => [createSavedOutfit(activeLayers, selectedOutfit.title), ...items]);
  }

  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <Pressable onPress={onBack} style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>
        <View style={styles.titleBlock}>
          <Text style={styles.eyebrow}>REAL-TIME GLB FITTING</Text>
          <Text style={styles.title}>Virtual Try-On</Text>
        </View>
        <View style={styles.fitPill}>
          <Text style={styles.fitPillText}>98%</Text>
        </View>
      </View>

      <View style={styles.avatarFrame}>
        <AvatarViewer profile={defaultAvatarProfile} garments={activeLayers} fullscreen />
        <View style={styles.floatingActions}>
          <Pressable style={({ pressed }) => [styles.floatButton, pressed && styles.pressed]}><Text style={styles.floatText}>♡</Text></Pressable>
          <Pressable style={({ pressed }) => [styles.floatButton, pressed && styles.pressed]}><Text style={styles.floatText}>↗</Text></Pressable>
        </View>
        <View style={styles.lookMetaCard}>
          <View>
            <Text style={styles.lookTitle}>{selectedOutfit.title}</Text>
            <Text style={styles.lookSubtitle}>{selectedOutfit.category} · {selectedOutfit.attachmentBone} · {selectedOutfit.fittedScale}x fit</Text>
          </View>
          <Text style={styles.savedCount}>{savedOutfits.length} saved</Text>
        </View>
      </View>

      <View style={styles.bottomPanel}>
        <View style={styles.panelHeader}>
          <Text style={styles.panelTitle}>Outfit carousel</Text>
          <Text style={styles.panelAction}>Layer-ready</Text>
        </View>
        <OutfitCarousel items={fittedProducts} selectedId={selectedOutfit.id} onSelect={setSelectedOutfit} />
        <View style={styles.buttonRow}>
          <Button title="Save Outfit" variant="secondary" style={styles.actionButton} onPress={saveCurrentLook} />
          <Button title="Buy Now" style={styles.actionButton} />
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
    gap: spacing.md,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    color: colors.text,
    fontSize: 34,
    lineHeight: 36,
    marginTop: -2,
  },
  titleBlock: {
    flex: 1,
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
    overflow: 'hidden',
    marginBottom: spacing.xl,
    ...shadows.soft,
  },
  floatingActions: {
    position: 'absolute',
    right: spacing.lg,
    top: spacing.lg,
    gap: spacing.sm,
  },
  floatButton: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatText: {
    ...typography.subheading,
    color: colors.inverse,
  },
  lookMetaCard: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: 'rgba(0,0,0,0.78)',
    borderWidth: 1,
    borderColor: colors.borderStrong,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: spacing.md,
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
  savedCount: {
    ...typography.caption,
    color: colors.success,
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
