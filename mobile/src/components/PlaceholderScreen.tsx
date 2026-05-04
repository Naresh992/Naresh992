import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../theme/tokens';
import { LoginOtpScreen } from '../screens/Auth/LoginOtpScreen';
import { TryOnStudioScreen } from '../screens/TryOn/TryOnStudioScreen';

type Props = {
  routeName: string;
};

const screenDescriptions: Record<string, string> = {
  SplashScreen: 'Launch animation + session bootstrap',
  SocialLoginScreen: 'Google / Apple social auth',
  CameraScanScreen: 'Body scan camera capture and pose overlay',
  AvatarPreviewScreen: '3D avatar preview and confirmation',
  ProductListScreen: 'Categories and product discovery feed',
  ProductDetailScreen: 'Product details + Try-On CTA',
  ProfileHomeScreen: 'Saved looks, measurements, and orders',
};

export function PlaceholderScreen({ routeName }: Props) {
  if (routeName === 'LoginOtpScreen') return <LoginOtpScreen />;
  if (routeName === 'TryOnStudioScreen') return <TryOnStudioScreen />;

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <Text style={styles.title}>{routeName}</Text>
        <Text style={styles.description}>{screenDescriptions[routeName] ?? 'Coming soon'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  card: {
    width: '100%',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: spacing.xl,
  },
  title: {
    ...typography.title,
    color: colors.primaryText,
  },
  description: {
    ...typography.body,
    marginTop: spacing.sm,
    color: colors.secondaryText,
  },
});
