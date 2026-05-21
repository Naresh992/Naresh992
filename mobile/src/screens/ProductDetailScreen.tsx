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
        <View style={[styles.productArt, { backgroundColor: product.color }]}>
          <View style={[styles.hanger, { backgroundColor: product.accent }]} />
          <View style={[styles.sleeve, styles.leftSleeve, { backgroundColor: product.accent }]} />
          <View style={[styles.body, { borderColor: product.accent }]} />
          <View style={[styles.sleeve, styles.rightSleeve, { backgroundColor: product.accent }]} />
        </View>
        <View style={styles.titleRow}>
          <View style={styles.titleCopy}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.subtitle}>{product.category}</Text>
          </View>
          <Text style={styles.price}>${product.price}</Text>
        </View>
        <Text style={styles.description}>Preview this piece on your avatar before adding it to your bag.</Text>
        <View style={styles.infoGrid}>
          <Info label="Fit" value="Avatar ready" />
          <Info label="Size" value="M suggested" />
          <Info label="Return risk" value="Low" />
          <Info label="Try-on" value="Live" />
        </View>
        <Button title="Virtual Try-On" onPress={onTryOn} />
        <Button title="Add to Bag" variant="secondary" />
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
    gap: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  productArt: {
    height: 420,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  hanger: {
    position: 'absolute',
    top: spacing.xxl,
    width: 84,
    height: 6,
    borderRadius: radius.pill,
  },
  sleeve: {
    position: 'absolute',
    top: 150,
    width: 64,
    height: 150,
    borderRadius: radius.lg,
    opacity: 0.7,
  },
  leftSleeve: {
    left: 72,
    transform: [{ rotate: '12deg' }],
  },
  rightSleeve: {
    right: 72,
    transform: [{ rotate: '-12deg' }],
  },
  body: {
    width: 160,
    height: 230,
    borderRadius: radius.lg,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    borderWidth: 3,
    backgroundColor: 'rgba(0,0,0,0.16)',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.lg,
  },
  titleCopy: {
    flex: 1,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.muted,
    marginTop: spacing.xs,
  },
  price: {
    ...typography.heading,
    color: colors.text,
  },
  description: {
    ...typography.body,
    color: colors.muted,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  infoCard: {
    width: '48%',
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  infoLabel: {
    ...typography.caption,
    color: colors.muted,
  },
  infoValue: {
    ...typography.body,
    color: colors.text,
    marginTop: spacing.xs,
  },
});
