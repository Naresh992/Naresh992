import React, { createContext, useContext, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Product, products } from '../data/products';
import { AuthScreen } from '../screens/AuthScreen';
import { AvatarScreen } from '../screens/AvatarScreen';
import { BodyScanScreen } from '../screens/BodyScanScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { ProcessingScreen } from '../screens/ProcessingScreen';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SplashScreen } from '../screens/SplashScreen';
import { TryOnScreen } from '../screens/TryOnScreen';
import { colors, typography } from '../styles/theme';

type AppState = {
  hasScan: boolean;
  pendingTryOn: boolean;
  selectedProduct: Product;
  setHasScan: (value: boolean) => void;
  setPendingTryOn: (value: boolean) => void;
  setSelectedProduct: (value: Product) => void;
};

const StateContext = createContext<AppState | null>(null);
const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function useAppState() {
  const context = useContext(StateContext);
  if (!context) throw new Error('AppNavigator state is missing');
  return context;
}

function TabIcon({ symbol, color }: { symbol: string; color: string }) {
  return <Text style={[styles.tabIcon, { color }]}>{symbol}</Text>;
}

function HomeRoute({ navigation }: any) {
  const state = useAppState();
  function openTryOn(product: Product) {
    state.setSelectedProduct(product);
    if (!state.hasScan) {
      state.setPendingTryOn(true);
      navigation.getParent()?.navigate('BodyScan');
      return;
    }
    navigation.getParent()?.navigate('TryOn');
  }
  return (
    <HomeScreen
      onProfile={() => navigation.navigate('Profile')}
      onProduct={(product) => { state.setSelectedProduct(product); navigation.getParent()?.navigate('ProductDetail'); }}
      onTryOn={openTryOn}
    />
  );
}

function AvatarRoute({ navigation }: any) {
  const state = useAppState();
  return <AvatarScreen onProfile={() => navigation.navigate('Profile')} onTryOn={() => navigation.getParent()?.navigate(state.hasScan ? 'TryOn' : 'BodyScan')} />;
}

function TryOnTabRoute({ navigation }: any) {
  const state = useAppState();
  return state.hasScan ? <TryOnScreen product={state.selectedProduct} onBack={() => navigation.navigate('Home')} /> : <BodyScanScreen onScan={() => navigation.getParent()?.navigate('Processing')} onBack={() => navigation.navigate('Home')} />;
}

function MainTabs() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: typography.caption,
      }}
    >
      <Tabs.Screen name="Home" component={HomeRoute} options={{ tabBarIcon: ({ color }) => <TabIcon color={color} symbol="⌂" /> }} />
      <Tabs.Screen name="Avatar" component={AvatarRoute} options={{ tabBarIcon: ({ color }) => <TabIcon color={color} symbol="◎" /> }} />
      <Tabs.Screen name="TryOnTab" component={TryOnTabRoute} options={{ title: 'Try-On', tabBarIcon: ({ color }) => <TabIcon color={color} symbol="⌘" /> }} />
      <Tabs.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: ({ color }) => <TabIcon color={color} symbol="♙" /> }} />
    </Tabs.Navigator>
  );
}

function ProductDetailRoute({ navigation }: any) {
  const state = useAppState();
  function openTryOn() {
    if (!state.hasScan) {
      state.setPendingTryOn(true);
      navigation.navigate('BodyScan');
      return;
    }
    navigation.navigate('TryOn');
  }
  return <ProductDetailScreen product={state.selectedProduct} onBack={() => navigation.navigate('MainTabs')} onTryOn={openTryOn} />;
}

function BodyScanRoute({ navigation }: any) {
  return <BodyScanScreen onScan={() => navigation.navigate('Processing')} onBack={() => navigation.goBack()} />;
}

function ProcessingRoute({ navigation }: any) {
  const state = useAppState();
  return <ProcessingScreen onComplete={() => { state.setHasScan(true); navigation.replace(state.pendingTryOn ? 'TryOn' : 'MainTabs'); state.setPendingTryOn(false); }} />;
}

function TryOnRoute({ navigation }: any) {
  const state = useAppState();
  return <TryOnScreen product={state.selectedProduct} onBack={() => navigation.navigate('ProductDetail')} />;
}

export function AppNavigator() {
  const [hasScan, setHasScan] = useState(false);
  const [pendingTryOn, setPendingTryOn] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);

  return (
    <StateContext.Provider value={{ hasScan, pendingTryOn, selectedProduct, setHasScan, setPendingTryOn, setSelectedProduct }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right', contentStyle: styles.stackContent }}>
          <Stack.Screen name="Splash" component={({ navigation }: any) => <SplashScreen onContinue={() => navigation.navigate('Onboarding')} />} />
          <Stack.Screen name="Onboarding" component={({ navigation }: any) => <OnboardingScreen onGetStarted={() => navigation.navigate('Auth')} />} />
          <Stack.Screen name="Auth" component={({ navigation }: any) => <AuthScreen onDone={() => navigation.replace('MainTabs')} onBack={() => navigation.goBack()} />} />
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="ProductDetail" component={ProductDetailRoute} />
          <Stack.Screen name="BodyScan" component={BodyScanRoute} />
          <Stack.Screen name="Processing" component={ProcessingRoute} />
          <Stack.Screen name="TryOn" component={TryOnRoute} />
        </Stack.Navigator>
      </NavigationContainer>
    </StateContext.Provider>
  );
}

const styles = StyleSheet.create({
  stackContent: {
    backgroundColor: colors.background,
  },
  tabBar: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
  },
  tabIcon: {
    fontSize: 18,
  },
});
