import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Product } from '../data/products';
import { colors, radius, spacing, typography } from '../styles/theme';

type Props = { product: Product; onBack: () => void; onTryOn: () => void };

export function ProductDetailScreen({ product, onBack, onTryOn }: Props) {
  return (
    <View style={styles.screen}>
      <Header title="PRODUCT" showBack onBack={onBack} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.productStage, { backgroundColor: product.color }]}>
          <View style={[styles.hanger, { backgroundColor: product.accent }]} />
          <View style={[styles.sleeveLeft, { backgroundColor: product.accent }]} />
          <View style={[styles.body, { borderColor: product.accent }]} />
          <View style={[styles.sleeveRight, { backgroundColor: product.accent }]} />
        </View>
        <View style={styles.titleRow}>
          <View style={styles.titleCopy}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.meta}>{product.category}</Text>
          </View>
          <Text style={styles.price}>${product.price}</Text>
        </View>
        <Text style={styles.description}>A premium try-on ready garment rendered as native interface shapes. Source assets remain untouched while previews adapt to your avatar measurements.</Text>
        <View style={styles.infoGrid}>
          <Info label="Fit" value={product.fit} />
          <Info label="Preview" value="Non-destructive" />
          <Info label="Sizes" value="XS–XL" />
          <Info label="Return risk" value="Low" />
        </View>
        <Button title="Virtual Try-On" onPress={onTryOn} />
        <Button title="Add to Wishlist" variant="secondary" />
      </ScrollView>
    </View>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
    gap: spacing.xl,
  },
  productStage: {
    height: 430,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  hanger: {
    position: 'absolute',
    top: 54,
    width: 82,
    height: 6,
    borderRadius: radius.pill,
  },
  sleeveLeft: {
    position: 'absolute',
    left: 70,
    top: 150,
    width: 64,
    height: 150,
    borderRadius: radius.xl,
    opacity: 0.74,
    transform: [{ rotate: '13deg' }],
  },
  sleeveRight: {
    position: 'absolute',
    right: 70,
    top: 150,
    width: 64,
    height: 150,
    borderRadius: radius.xl,
    opacity: 0.74,
    transform: [{ rotate: '-13deg' }],
  },
  body: {
    width: 160,
    height: 230,
    borderTopLeftRadius: 78,
    borderTopRightRadius: 78,
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
    borderWidth: 3,
    backgroundColor: 'rgba(0,0,0,0.18)',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.lg,
    alignItems: 'flex-start',
  },
  titleCopy: {
    flex: 1,
  },
  title: {
    ...typography.h1,
    color: colors.text,
  },
  meta: {
    ...typography.body,
    color: colors.muted,
    marginTop: spacing.xs,
  },
  price: {
    ...typography.h1,
    color: colors.text,
  },
  description: {
    ...typography.body,
    color: colors.muted,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.sm,
    rowGap: spacing.md,
  },
  infoCard: {
    width: '50%',
    paddingHorizontal: spacing.sm,
  },
  infoLabel: {
    ...typography.micro,
    color: colors.subtle,
    marginBottom: spacing.xs,
  },
  infoValue: {
    ...typography.bodyStrong,
    color: colors.text,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.lg,
  },
});
