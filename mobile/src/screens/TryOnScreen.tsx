import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Product } from '../data/products';
import { colors, radius, spacing, typography } from '../styles/theme';

type Props = { product?: Product; onBack: () => void };

export function TryOnScreen({ product, onBack }: Props) {
  return (
    <View style={styles.screen}>
      <Header showBack onBack={onBack} />
      <View style={styles.preview}>
        <Text style={styles.avatar}>🧍</Text>
        {product && <Image source={{ uri: product.imageUrl }} style={styles.garment} />}
      </View>
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <Text style={styles.title}>Virtual Try-On</Text>
        <Text style={styles.subtitle}>{product ? `${product.title} fitted to your avatar` : 'Select an outfit to preview on your avatar.'}</Text>
        <View style={styles.modeRow}><Text style={styles.activeMode}>2D</Text><Text style={styles.mode}>3D</Text><Text style={styles.mode}>AR</Text></View>
        <Button title="Save Outfit" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  preview: { flex: 1, margin: spacing.lg, borderRadius: radius.xl, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
  avatar: { fontSize: 210, opacity: 0.82 },
  garment: { position: 'absolute', width: 130, height: 150, top: '31%', borderRadius: radius.md, opacity: 0.9 },
  sheet: { padding: spacing.xl, gap: spacing.md, borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.xl, backgroundColor: colors.elevated, borderWidth: 1, borderColor: colors.border },
  handle: { width: 48, height: 5, borderRadius: 3, backgroundColor: colors.border, alignSelf: 'center' },
  title: { ...typography.h1, color: colors.text, textAlign: 'center' },
  subtitle: { ...typography.body, color: colors.muted, textAlign: 'center' },
  modeRow: { flexDirection: 'row', gap: spacing.md, justifyContent: 'center' },
  mode: { ...typography.body, color: colors.muted, borderWidth: 1, borderColor: colors.border, borderRadius: radius.pill, paddingVertical: spacing.sm, paddingHorizontal: spacing.lg },
  activeMode: { ...typography.body, color: colors.inverse, backgroundColor: colors.text, borderRadius: radius.pill, paddingVertical: spacing.sm, paddingHorizontal: spacing.lg, overflow: 'hidden' },
});
