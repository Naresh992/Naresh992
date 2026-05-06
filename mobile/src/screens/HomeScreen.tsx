import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { Product, products } from '../data/products';
import { colors, radius, spacing, typography } from '../styles/theme';

type Props = {
  onProfile: () => void;
  onProduct: (product: Product) => void;
  onTryOn: (product: Product) => void;
};

export function HomeScreen({ onProfile, onProduct, onTryOn }: Props) {
  return (
    <View style={styles.screen}>
      <Header title="RARITONE" subtitle="Virtual try-on" onProfile={onProfile} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.heroCopy}>
            <Text style={styles.kicker}>NEW DROP</Text>
            <Text style={styles.title}>Try fits built for your avatar.</Text>
            <Text style={styles.subtitle}>Browse curated pieces and preview them non-destructively on your measured body profile.</Text>
          </View>
          <View style={styles.heroArt}>
            <View style={styles.heroCircle} />
            <View style={styles.heroTorso} />
          </View>
        </View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended</Text>
          <Text style={styles.sectionAction}>View all</Text>
        </View>
        <View style={styles.grid}>
          {products.map((product) => (
            <View key={product.id} style={styles.gridItem}>
              <ProductCard product={product} onPress={() => onProduct(product)} onTryOn={() => onTryOn(product)} />
            </View>
          ))}
        </View>
      </ScrollView>
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
  hero: {
    minHeight: 250,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    overflow: 'hidden',
  },
  heroCopy: {
    maxWidth: '70%',
    gap: spacing.md,
    zIndex: 1,
  },
  kicker: {
    ...typography.micro,
    color: colors.muted,
  },
  title: {
    ...typography.h1,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.muted,
  },
  heroArt: {
    position: 'absolute',
    right: -10,
    bottom: -10,
    width: 150,
    height: 220,
    alignItems: 'center',
  },
  heroCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: colors.text,
    marginBottom: spacing.sm,
  },
  heroTorso: {
    width: 110,
    height: 150,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderWidth: 2,
    borderColor: colors.text,
    backgroundColor: colors.card,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.text,
  },
  sectionAction: {
    ...typography.caption,
    color: colors.muted,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.sm,
    rowGap: spacing.xl,
  },
  gridItem: {
    width: '50%',
    paddingHorizontal: spacing.sm,
  },
});
