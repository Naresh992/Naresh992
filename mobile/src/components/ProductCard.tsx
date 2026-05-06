import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Product } from '../data/products';
import { colors, radius, spacing, typography } from '../styles/theme';

type Props = {
  product: Product;
  onPress?: () => void;
  onTryOn?: () => void;
};

export function ProductCard({ product, onPress, onTryOn }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.card}>
      <View style={[styles.productArt, { backgroundColor: product.color }]}>
        <View style={[styles.hanger, { backgroundColor: product.accent }]} />
        <View style={styles.shoulders}>
          <View style={[styles.sleeve, { backgroundColor: product.accent }]} />
          <View style={[styles.body, { backgroundColor: product.color, borderColor: product.accent }]} />
          <View style={[styles.sleeve, { backgroundColor: product.accent }]} />
        </View>
        <TouchableOpacity activeOpacity={0.82} onPress={onTryOn} style={styles.tryButton}>
          <Text style={styles.tryText}>Try-On</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.metaRow}>
        <View style={styles.copy}>
          <Text numberOfLines={1} style={styles.title}>{product.title}</Text>
          <Text numberOfLines={1} style={styles.category}>{product.category}</Text>
        </View>
        <Text style={styles.price}>${product.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    gap: spacing.md,
  },
  productArt: {
    minHeight: 214,
    borderRadius: radius.xl,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  hanger: {
    position: 'absolute',
    top: 28,
    width: 54,
    height: 5,
    borderRadius: radius.pill,
    opacity: 0.9,
  },
  shoulders: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  sleeve: {
    width: '22%',
    height: 112,
    borderRadius: radius.lg,
    opacity: 0.64,
    transform: [{ rotate: '10deg' }],
  },
  body: {
    width: '46%',
    height: 142,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    borderBottomLeftRadius: radius.md,
    borderBottomRightRadius: radius.md,
    borderWidth: 2,
  },
  tryButton: {
    position: 'absolute',
    right: spacing.md,
    top: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.text,
  },
  tryText: {
    ...typography.caption,
    color: colors.inverse,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  copy: {
    flex: 1,
  },
  title: {
    ...typography.bodyStrong,
    color: colors.text,
  },
  category: {
    ...typography.caption,
    color: colors.muted,
    marginTop: 2,
  },
  price: {
    ...typography.h2,
    color: colors.text,
    fontSize: 20,
  },
});
