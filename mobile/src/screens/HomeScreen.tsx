import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { products, Product } from '../data/products';
import { colors, radius, spacing, typography } from '../styles/theme';

type Props = { onProduct: (product: Product) => void; onTryOn: (product: Product) => void; onProfile: () => void };

export function HomeScreen({ onProduct, onTryOn, onProfile }: Props) {
  return (
    <View style={styles.screen}>
      <Header onProfile={onProfile} />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.content}
        ListHeaderComponent={(
          <>
            <View style={styles.search}><Text style={styles.searchText}>Search clothes, shoes, jewellery</Text></View>
            <View style={styles.hero}><Text style={styles.heroEyebrow}>SUMMER 2026</Text><Text style={styles.heroTitle}>Golden Hour{`\n`}Collection</Text><Text style={styles.heroCta}>SHOP THE EDIT →</Text></View>
            <View style={styles.categories}><Text style={styles.activeCategory}>All</Text><Text>Men</Text><Text>Women</Text><Text>Trending</Text></View>
          </>
        )}
        renderItem={({ item }) => <ProductCard product={item} onPress={() => onProduct(item)} onTryOn={() => onTryOn(item)} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: 120, gap: spacing.lg },
  row: { gap: spacing.lg, marginBottom: spacing.xl },
  search: { height: 48, borderRadius: radius.pill, backgroundColor: colors.surface, justifyContent: 'center', paddingHorizontal: spacing.lg, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.lg },
  searchText: { ...typography.body, color: colors.muted },
  hero: { height: 320, borderRadius: radius.xl, backgroundColor: colors.elevated, padding: spacing.xl, justifyContent: 'flex-end', borderWidth: 1, borderColor: colors.border, marginBottom: spacing.lg },
  heroEyebrow: { ...typography.caption, color: colors.muted, letterSpacing: 2 },
  heroTitle: { ...typography.hero, color: colors.text, marginVertical: spacing.sm },
  heroCta: { ...typography.caption, color: colors.text, letterSpacing: 1.4 },
  categories: { flexDirection: 'row', gap: spacing.lg, marginBottom: spacing.lg },
  activeCategory: { color: colors.text },
});
