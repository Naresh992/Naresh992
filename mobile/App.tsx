import React, { useMemo, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { routes, type AppRoute } from './src/config/routes';
import { colors, spacing, typography } from './src/theme/tokens';
import { PlaceholderScreen } from './src/components/PlaceholderScreen';

const orderedRoutes: AppRoute[] = [
  routes.splash,
  routes.loginOtp,
  routes.socialLogin,
  routes.cameraScan,
  routes.avatarPreview,
  routes.tryOnStudio,
  routes.productList,
  routes.productDetail,
  routes.profileHome,
];

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(routes.splash);

  const title = useMemo(() => {
    return currentRoute.replace('Screen', '').replace(/([A-Z])/g, ' $1').trim();
  }, [currentRoute]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.appTitle}>Raritone</Text>
        <Text style={styles.routeTitle}>{title}</Text>
      </View>

      <PlaceholderScreen routeName={currentRoute} />

      <View style={styles.navBar}>
        {orderedRoutes.map((route) => (
          <TouchableOpacity
            key={route}
            style={[styles.tab, currentRoute === route && styles.activeTab]}
            onPress={() => setCurrentRoute(route)}
          >
            <Text style={[styles.tabText, currentRoute === route && styles.activeTabText]}>
              {route.replace('Screen', '')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  appTitle: {
    ...typography.heading2,
    color: colors.primaryText,
  },
  routeTitle: {
    ...typography.body,
    color: colors.secondaryText,
    marginTop: spacing.xs,
  },
  navBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.sm,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    gap: spacing.xs,
  },
  tab: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: colors.primaryText,
    borderColor: colors.primaryText,
  },
  tabText: {
    ...typography.caption,
    color: colors.secondaryText,
  },
  activeTabText: {
    color: colors.background,
  },
});
