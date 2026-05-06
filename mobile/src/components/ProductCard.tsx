import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Product } from '../data/products';
import { colors, radius, spacing, typography } from '../styles/theme';

type Props = {
  product: Product;
  onPress?: () => void;
  onTryOn?: () => void;
};

export function ProductCard({ product, onPress, onTryOn }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={[styles.art, { backgroundColor: product.color }]}>
        <View style={[styles.hanger, { backgroundColor: product.accent }]} />
        <View style={styles.garmentRow}>
          <View style={[styles.sleeve, styles.leftSleeve, { backgroundColor: product.accent }]} />
          <View style={[styles.body, { borderColor: product.accent }]} />
          <View style={[styles.sleeve, styles.rightSleeve, { backgroundColor: product.accent }]} />
        </View>
        <Pressable onPress={onTryOn} style={styles.tryButton}>
          <Text style={styles.tryText}>Try</Text>
        </Pressable>
      </View>
      <View style={styles.infoRow}>
        <View style={styles.infoText}>
          <Text numberOfLines={1} style={styles.title}>{product.title}</Text>
          <Text numberOfLines={1} style={styles.category}>{product.category}</Text>
        </View>
        <Text style={styles.price}>${product.price}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    gap: spacing.md,
  },
  art: {
    height: 210,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hanger: {
    position: 'absolute',
    top: spacing.xl,
    width: 54,
    height: 5,
    borderRadius: radius.pill,
    opacity: 0.9,
  },
  garmentRow: {
    width: '82%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  sleeve: {
    width: 34,
    height: 104,
    borderRadius: radius.lg,
    opacity: 0.7,
  },
  leftSleeve: {
    transform: [{ rotate: '11deg' }],
  },
  rightSleeve: {
    transform: [{ rotate: '-11deg' }],
  },
  body: {
    width: 78,
    height: 132,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: radius.md,
    borderBottomRightRadius: radius.md,
    borderWidth: 2,
    backgroundColor: 'rgba(0,0,0,0.15)',
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
  tryText: {
    ...typography.caption,
    color: colors.inverse,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  infoText: {
    flex: 1,
  },
  title: {
    ...typography.body,
    color: colors.text,
  },
  category: {
    ...typography.caption,
    color: colors.muted,
    marginTop: spacing.xs,
  },
  price: {
    ...typography.heading,
    color: colors.text,
    fontSize: 18,
  },
});
