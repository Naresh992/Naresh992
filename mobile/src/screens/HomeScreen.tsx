import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { Product, categories, products } from '../data/products';
import { colors, radius, spacing, typography } from '../styles/theme';

type Props = {
  onProfile: () => void;
  onProduct: (product: Product) => void;
  onTryOn: (product: Product) => void;
};

export function HomeScreen({ onProfile, onProduct, onTryOn }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const visibleProducts = selectedCategory === 'All' ? products : products.filter((product) => product.category === selectedCategory);

  return (
    <View style={styles.screen}>
      <Header title="RARITONE" onProfile={onProfile} />
      <FlatList
        data={visibleProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={
          <View style={styles.headerContent}>
            <View style={styles.heroCard}>
              <Text style={styles.eyebrow}>NEW ARRIVALS</Text>
              <Text style={styles.title}>Find your next fit.</Text>
              <Text style={styles.subtitle}>Try products on your avatar before checkout.</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
              {categories.map((category) => (
                <Text
                  key={category}
                  onPress={() => setSelectedCategory(category)}
                  style={[styles.categoryPill, selectedCategory === category && styles.categoryPillActive]}
                >
                  {category}
                </Text>
              ))}
            </ScrollView>
            <View style={styles.sectionRow}>
              <Text style={styles.sectionTitle}>Products</Text>
              <Text style={styles.sectionCount}>{visibleProducts.length} items</Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.gridItem}>
            <ProductCard product={item} onPress={() => onProduct(item)} onTryOn={() => onTryOn(item)} />
          </View>
        )}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  headerContent: {
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  heroCard: {
    minHeight: 180,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    justifyContent: 'flex-end',
    gap: spacing.sm,
  },
  eyebrow: {
    ...typography.caption,
    color: colors.muted,
    letterSpacing: 1.2,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.muted,
  },
  categoryRow: {
    gap: spacing.sm,
    paddingRight: spacing.lg,
  },
  categoryPill: {
    ...typography.body,
    color: colors.text,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    overflow: 'hidden',
  },
  categoryPillActive: {
    color: colors.inverse,
    backgroundColor: colors.text,
    borderColor: colors.text,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    ...typography.heading,
    color: colors.text,
  },
  sectionCount: {
    ...typography.caption,
    color: colors.muted,
  },
  columnWrapper: {
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  gridItem: {
    flex: 1,
  },
});
