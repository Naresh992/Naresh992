import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { colors, radius, spacing, typography } from '../styles/theme';

export function ProfileScreen() {
  const rows = ['Order History', 'My Wardrobe', 'Wishlist', 'Payment Methods', 'Settings', 'Privacy Policy', 'Help Center'];
  return (
    <View style={styles.screen}>
      <Header title="TRYON." />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.avatarHero}><Text style={styles.avatar}>🧍</Text></View>
        <View style={styles.stats}><View><Text style={styles.metric}>34</Text><Text style={styles.label}>Orders</Text></View><View><Text style={styles.metric}>28</Text><Text style={styles.label}>Wishlist</Text></View><View><Text style={styles.metric}>8</Text><Text style={styles.label}>Reviews</Text></View></View>
        <View style={styles.menu}>{rows.map((row) => <View style={styles.row} key={row}><Text style={styles.rowText}>{row}</Text><Text style={styles.chevron}>›</Text></View>)}</View>
        <Button title="Sign Out" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: 120 },
  avatarHero: { height: 300, borderRadius: radius.xl, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border },
  avatar: { fontSize: 160 },
  stats: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: colors.elevated, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border },
  metric: { ...typography.h2, color: colors.text, textAlign: 'center' },
  label: { ...typography.caption, color: colors.muted, textAlign: 'center' },
  menu: { borderRadius: radius.lg, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
  row: { minHeight: 58, backgroundColor: colors.surface, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border },
  rowText: { ...typography.body, color: colors.text, fontWeight: '700' },
  chevron: { color: colors.muted, fontSize: 24 },
});
