import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { FittedGarment } from '../avatar/avatarEngine';
import { colors, radius, spacing, typography } from '../styles/theme';

type Props = {
  items: FittedGarment[];
  selectedId: string;
  onSelect: (item: FittedGarment) => void;
};

export function OutfitCarousel({ items, selectedId, onSelect }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sliderContent}>
      {items.map((item) => {
        const isSelected = selectedId === item.id;
        return (
          <Pressable
            key={item.id}
            onPress={() => onSelect(item)}
            style={({ pressed }) => [styles.outfitCard, isSelected && styles.outfitCardActive, pressed && styles.pressed]}
          >
            <View style={[styles.outfitSwatch, { backgroundColor: item.color }]}>
              <View style={[styles.attachmentDot, isSelected && styles.attachmentDotActive]} />
            </View>
            <Text numberOfLines={1} style={[styles.outfitName, isSelected && styles.outfitNameActive]}>{item.title}</Text>
            <Text style={[styles.outfitMeta, isSelected && styles.outfitMetaActive]}>{item.category} · {item.attachmentBone}</Text>
            <Text style={[styles.outfitPrice, isSelected && styles.outfitPriceActive]}>${item.price}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sliderContent: {
    gap: spacing.md,
    paddingRight: spacing.xl,
  },
  outfitCard: {
    width: 150,
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
    height: 64,
    borderRadius: radius.md,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: spacing.sm,
  },
  attachmentDot: {
    width: 16,
    height: 16,
    borderRadius: radius.pill,
    backgroundColor: colors.text,
    borderWidth: 2,
    borderColor: colors.inverse,
  },
  attachmentDotActive: {
    backgroundColor: colors.inverse,
    borderColor: colors.text,
  },
  outfitName: {
    ...typography.caption,
    color: colors.text,
  },
  outfitNameActive: {
    color: colors.inverse,
  },
  outfitMeta: {
    ...typography.micro,
    color: colors.subtle,
  },
  outfitMetaActive: {
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
});
