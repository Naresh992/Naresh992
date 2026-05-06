import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Product } from '../data/products';
import { colors, radius, spacing, typography } from '../styles/theme';

type Props = {
  product: Product;
  onPress?: () => void;
  onTryOn?: () => void;
};

export function ProductCard({ product, onPress, onTryOn }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.88} style={styles.card} onPress={onPress}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <TouchableOpacity activeOpacity={0.82} style={styles.tryOnButton} onPress={onTryOn}>
        <Text style={styles.tryOnText}>Try-On</Text>
      </TouchableOpacity>
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
  card: { flex: 1, gap: spacing.sm },
  image: { width: '100%', aspectRatio: 0.92, borderRadius: radius.lg, backgroundColor: colors.elevated },
  tryOnButton: {
    position: 'absolute',
    right: spacing.sm,
    top: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.text,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  tryOnText: { ...typography.caption, color: colors.inverse, fontWeight: '800' },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.sm, alignItems: 'flex-start' },
  copy: { flex: 1 },
  title: { ...typography.body, color: colors.text, fontWeight: '800' },
  category: { ...typography.caption, color: colors.muted, marginTop: 2 },
  price: { ...typography.h2, color: colors.text, fontSize: 20 },
});
