import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { Product, categories, products } from '../data/products';
import { colors, radius, shadows, spacing, typography } from '../styles/theme';

type Props = {
  onProfile: () => void;
  onProduct: (product: Product) => void;
  onTryOn: (product: Product) => void;
};

export function HomeScreen({ onProfile, onProduct, onTryOn }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const visibleProducts = useMemo(
    () => selectedCategory === 'All' ? products : products.filter((product) => product.category === selectedCategory),
    [selectedCategory],
  );
  const trending = products.slice(0, 3);

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
              <View style={styles.heroGlow} />
              <Text style={styles.eyebrow}>SPRING EDIT</Text>
              <Text style={styles.heroTitle}>Precision fit, styled for you.</Text>
              <Text style={styles.heroSubtitle}>Scan once and preview every look on your Raritone avatar.</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <Pressable
                    key={category}
                    onPress={() => setSelectedCategory(category)}
                    style={({ pressed }) => [styles.categoryPill, isActive && styles.categoryPillActive, pressed && styles.pressed]}
                  >
                    <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>{category}</Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            <View style={styles.sectionBlock}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Trending</Text>
                <Text style={styles.sectionAction}>This week</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.trendingRow}>
                {trending.map((item) => (
                  <Pressable key={item.id} onPress={() => onProduct(item)} style={({ pressed }) => [styles.trendingCard, pressed && styles.pressed]}>
                    <View style={[styles.trendingSwatch, { backgroundColor: item.color }]} />
                    <View style={styles.trendingCopy}>
                      <Text numberOfLines={1} style={styles.trendingTitle}>{item.title}</Text>
                      <Text style={styles.trendingMeta}>${item.price}</Text>
                    </View>
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recommended for you</Text>
              <Text style={styles.sectionAction}>{visibleProducts.length} items</Text>
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
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  headerContent: {
    gap: spacing.xxl,
    marginBottom: spacing.xl,
  },
  heroCard: {
    minHeight: 220,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    justifyContent: 'flex-end',
    gap: spacing.sm,
    overflow: 'hidden',
    ...shadows.soft,
  },
  heroGlow: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 95,
    right: -54,
    top: -42,
    backgroundColor: 'rgba(255,255,255,0.10)',
  },
  eyebrow: {
    ...typography.micro,
    color: colors.muted,
  },
  heroTitle: {
    ...typography.title,
    color: colors.text,
    maxWidth: 290,
  },
  heroSubtitle: {
    ...typography.body,
    color: colors.muted,
    maxWidth: 280,
  },
  categoryRow: {
    gap: spacing.sm,
    paddingRight: spacing.xl,
  },
  categoryPill: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  categoryPillActive: {
    backgroundColor: colors.text,
    borderColor: colors.text,
  },
  categoryText: {
    ...typography.bodyMedium,
    color: colors.text,
  },
  categoryTextActive: {
    color: colors.inverse,
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
  sectionBlock: {
    gap: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    ...typography.heading,
    color: colors.text,
  },
  sectionAction: {
    ...typography.caption,
    color: colors.muted,
  },
  trendingRow: {
    gap: spacing.md,
    paddingRight: spacing.xl,
  },
  trendingCard: {
    width: 170,
    minHeight: 82,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  trendingSwatch: {
    width: 46,
    height: 58,
    borderRadius: radius.md,
  },
  trendingCopy: {
    flex: 1,
    gap: spacing.xs,
  },
  trendingTitle: {
    ...typography.caption,
    color: colors.text,
  },
  trendingMeta: {
    ...typography.caption,
    color: colors.muted,
  },
  columnWrapper: {
    gap: spacing.lg,
    marginBottom: spacing.xxl,
  },
  gridItem: {
    flex: 1,
  },
});
