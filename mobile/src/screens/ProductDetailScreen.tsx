import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Product } from '../data/products';
import { colors, radius, spacing, typography } from '../styles/theme';

type Props = { product: Product; onBack: () => void; onTryOn: () => void };

export function ProductDetailScreen({ product, onBack, onTryOn }: Props) {
  return (
    <View style={styles.screen}>
      <Header showBack onBack={onBack} />
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: product.imageUrl }} style={styles.image} />
        <View style={styles.row}>
          <View><Text style={styles.title}>{product.title}</Text><Text style={styles.category}>{product.category}</Text></View>
          <Text style={styles.price}>${product.price}</Text>
        </View>
        <Text style={styles.rating}>4.0  ★ ★ ★ ★ ☆</Text>
        <Text style={styles.label}>Color</Text>
        <View style={styles.swatches}><View style={[styles.swatch, styles.brown]} /><View style={[styles.swatch, styles.gray]} /><View style={[styles.swatch, styles.black]} /></View>
        <Text style={styles.label}>Size</Text>
        <View style={styles.sizes}>{['S', 'M', 'L', 'XL'].map((size) => <Text style={styles.size} key={size}>{size}</Text>)}</View>
        <Button title="Try On" onPress={onTryOn} />
        <Button title="Add to Cart" variant="secondary" />
        <Text style={styles.heading}>Description</Text>
        <Text style={styles.description}>Premium minimalist fit designed for virtual try-on. Clean silhouette, soft structure, and easy pairing with your saved wardrobe.</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: 120, gap: spacing.lg },
  image: { width: '100%', height: 420, borderRadius: radius.xl, backgroundColor: colors.surface },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: spacing.lg },
  title: { ...typography.h2, color: colors.text },
  category: { ...typography.body, color: colors.muted },
  price: { ...typography.h1, color: colors.text },
  rating: { ...typography.body, color: colors.text },
  label: { ...typography.h2, color: colors.text, fontSize: 18 },
  swatches: { flexDirection: 'row', gap: spacing.md },
  swatch: { width: 34, height: 34, borderRadius: 17 },
  brown: { backgroundColor: '#8A5D3E' },
  gray: { backgroundColor: '#8E8E8E' },
  black: { backgroundColor: '#FFFFFF' },
  sizes: { flexDirection: 'row', gap: spacing.md },
  heading: { ...typography.h2, color: colors.text },
  description: { ...typography.body, color: colors.muted },
  size: { color: colors.text, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm },
});
