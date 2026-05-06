import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { colors, radius, spacing, typography } from '../styles/theme';

type Props = { onTryOn: () => void; onProfile: () => void };

export function AvatarScreen({ onTryOn, onProfile }: Props) {
  return (
    <View style={styles.screen}>
      <Header title="TRYON." onProfile={onProfile} />
      <View style={styles.avatarStage}><Text style={styles.avatar}>🧍</Text></View>
      <View style={styles.panel}>
        <View style={styles.tabs}><Text>Fashion</Text><Text>Avatar</Text><Text>Settings</Text></View>
        <View style={styles.measurements}>
          <View><Text style={styles.metric}>175</Text><Text style={styles.label}>Height</Text></View>
          <View><Text style={styles.metric}>34</Text><Text style={styles.label}>Chest</Text></View>
          <View><Text style={styles.metric}>28</Text><Text style={styles.label}>Waist</Text></View>
        </View>
        <Button title="Start Virtual Try-On" onPress={onTryOn} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  avatarStage: { flex: 1, margin: spacing.lg, borderRadius: radius.xl, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border },
  avatar: { fontSize: 180 },
  panel: { padding: spacing.xl, gap: spacing.lg, backgroundColor: colors.elevated, borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.xl },
  tabs: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md },
  measurements: { flexDirection: 'row', justifyContent: 'space-between' },
  metric: { ...typography.h2, color: colors.text, textAlign: 'center' },
  label: { ...typography.caption, color: colors.muted, textAlign: 'center' },
});
