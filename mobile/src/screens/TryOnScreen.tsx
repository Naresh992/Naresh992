import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Product } from '../data/products';
import { colors, radius, spacing, typography } from '../styles/theme';

type Props = { product: Product; onBack: () => void };

export function TryOnScreen({ product, onBack }: Props) {
  return (
    <View style={styles.screen}>
      <Header title="TRY-ON" showBack onBack={onBack} />
      <View style={styles.stage}>
        <View style={styles.avatarHead} />
        <View style={[styles.garment, { backgroundColor: product.color, borderColor: product.accent }]}>
          <View style={[styles.placket, { backgroundColor: product.accent }]} />
        </View>
        <View style={styles.legs}>
          <View style={styles.leg} />
          <View style={styles.leg} />
        </View>
        <View style={styles.fitBadge}>
          <Text style={styles.fitScore}>98%</Text>
          <Text style={styles.fitLabel}>Fit Match</Text>
        </View>
      </View>
      <View style={styles.panel}>
        <View>
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.productMeta}>{product.category} · {product.fit}</Text>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.stat}><Text style={styles.statValue}>M</Text><Text style={styles.statLabel}>Best size</Text></View>
          <View style={styles.stat}><Text style={styles.statValue}>2cm</Text><Text style={styles.statLabel}>Ease</Text></View>
          <View style={styles.stat}><Text style={styles.statValue}>Low</Text><Text style={styles.statLabel}>Return risk</Text></View>
        </View>
        <Button title="Add to Bag" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  stage: {
    flex: 1,
    margin: spacing.lg,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarHead: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: colors.text,
    marginBottom: spacing.md,
  },
  garment: {
    width: 154,
    height: 192,
    borderTopLeftRadius: 72,
    borderTopRightRadius: 72,
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
    borderWidth: 3,
    alignItems: 'center',
  },
  placket: {
    width: 4,
    height: '88%',
    borderRadius: radius.pill,
    marginTop: spacing.lg,
  },
  legs: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginTop: spacing.sm,
  },
  leg: {
    width: 44,
    height: 112,
    borderRadius: radius.md,
    backgroundColor: colors.elevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
  fitBadge: {
    position: 'absolute',
    right: spacing.lg,
    top: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.text,
    padding: spacing.md,
    alignItems: 'center',
  },
  fitScore: {
    ...typography.h2,
    color: colors.inverse,
  },
  fitLabel: {
    ...typography.micro,
    color: colors.inverse,
  },
  panel: {
    backgroundColor: colors.elevated,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.lg,
  },
  productTitle: {
    ...typography.h1,
    color: colors.text,
  },
  productMeta: {
    ...typography.body,
    color: colors.muted,
    marginTop: spacing.xs,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  stat: {
    flex: 1,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.md,
  },
  statValue: {
    ...typography.bodyStrong,
    color: colors.text,
  },
  statLabel: {
    ...typography.caption,
    color: colors.muted,
    marginTop: spacing.xs,
  },
});
