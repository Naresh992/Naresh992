import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../theme/tokens';
import { LoginOtpScreen } from '../screens/Auth/LoginOtpScreen';
import { SocialLoginScreen } from '../screens/Auth/SocialLoginScreen';
import { TryOnStudioScreen } from '../screens/TryOn/TryOnStudioScreen';
import { ProductListScreen } from '../screens/Shop/ProductListScreen';
import { ProductDetailScreen } from '../screens/Shop/ProductDetailScreen';
import { ProfileHomeScreen } from '../screens/Profile/ProfileHomeScreen';
import { AvatarPreviewScreen } from '../screens/Avatar/AvatarPreviewScreen';
import { CameraScanScreen } from '../screens/Scan/CameraScanScreen';

type Props = { routeName: string };

export function PlaceholderScreen({ routeName }: Props) {
  if (routeName === 'LoginOtpScreen') return <LoginOtpScreen />;
  if (routeName === 'SocialLoginScreen') return <SocialLoginScreen />;
  if (routeName === 'TryOnStudioScreen') return <TryOnStudioScreen />;
  if (routeName === 'ProductListScreen') return <ProductListScreen />;
  if (routeName === 'ProductDetailScreen') return <ProductDetailScreen />;
  if (routeName === 'ProfileHomeScreen') return <ProfileHomeScreen />;
  if (routeName === 'AvatarPreviewScreen') return <AvatarPreviewScreen />;
  if (routeName === 'CameraScanScreen') return <CameraScanScreen />;

  return (
    <View style={styles.wrapper}><View style={styles.card}><Text style={styles.title}>{routeName}</Text><Text style={styles.description}>Coming soon</Text></View></View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.lg },
  card: { width: '100%', backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 16, padding: spacing.xl },
  title: { ...typography.title, color: colors.primaryText },
  description: { ...typography.body, marginTop: spacing.sm, color: colors.secondaryText },
});
