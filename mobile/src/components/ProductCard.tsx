import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Product } from '../data/products';
import { colors, radius, shadows, spacing, typography } from '../styles/theme';

type Props = {
  product: Product;
  onPress?: () => void;
  onTryOn?: () => void;
};

export function ProductCard({ product, onPress, onTryOn }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
      <View style={styles.imageShell}>
        <View style={[styles.imageContainer, { backgroundColor: product.color }]}>
          <View style={styles.highlight} />
          <View style={[styles.hanger, { backgroundColor: product.accent }]} />
          <View style={styles.garmentRow}>
            <View style={[styles.sleeve, styles.leftSleeve, { backgroundColor: product.accent }]} />
            <View style={[styles.body, { borderColor: product.accent }]} />
            <View style={[styles.sleeve, styles.rightSleeve, { backgroundColor: product.accent }]} />
          </View>
          <Pressable onPress={onTryOn} style={({ pressed }) => [styles.tryButton, pressed && styles.tryPressed]}>
            <Text style={styles.tryText}>Try-On</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.infoBlock}>
        <View style={styles.titleRow}>
          <Text numberOfLines={1} style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>${product.price}</Text>
        </View>
        <Text numberOfLines={1} style={styles.category}>{product.category}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    gap: spacing.md,
  },
  cardPressed: {
    opacity: 0.86,
    transform: [{ scale: 0.985 }],
  },
  imageShell: {
    borderRadius: radius.lg,
    backgroundColor: colors.card,
    padding: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.soft,
  },
  imageContainer: {
    height: 220,
    borderRadius: radius.md,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlight: {
    position: 'absolute',
    top: -42,
    right: -28,
    width: 132,
    height: 132,
    borderRadius: 66,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  hanger: {
    position: 'absolute',
    top: spacing.xxl,
    width: 56,
    height: 5,
    borderRadius: radius.pill,
    opacity: 0.92,
  },
  garmentRow: {
    width: '84%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  sleeve: {
    width: 36,
    height: 106,
    borderRadius: radius.lg,
    opacity: 0.72,
  },
  leftSleeve: {
    transform: [{ rotate: '11deg' }],
  },
  rightSleeve: {
    transform: [{ rotate: '-11deg' }],
  },
  body: {
    width: 82,
    height: 136,
    borderTopLeftRadius: 42,
    borderTopRightRadius: 42,
    borderBottomLeftRadius: radius.md,
    borderBottomRightRadius: radius.md,
    borderWidth: 2,
    backgroundColor: 'rgba(0,0,0,0.16)',
  },
  tryButton: {
    position: 'absolute',
    right: spacing.sm,
    top: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.text,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  tryPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.96 }],
  },
  tryText: {
    ...typography.caption,
    color: colors.inverse,
  },
  infoBlock: {
    paddingHorizontal: spacing.xs,
    gap: spacing.xs,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  title: {
    flex: 1,
    ...typography.bodyMedium,
    color: colors.text,
  },
  category: {
    ...typography.caption,
    color: colors.muted,
  },
  price: {
    ...typography.subheading,
    color: colors.text,
  },
});
