const { accessSync } = require('node:fs');

const requiredFiles = [
  'App.tsx',
  'src/navigation/AppNavigator.tsx',
  'src/styles/theme.ts',
  'src/components/Button.tsx',
  'src/components/Input.tsx',
  'src/components/ProductCard.tsx',
  'src/components/Header.tsx',
  'src/screens/SplashScreen.tsx',
  'src/screens/OnboardingScreen.tsx',
  'src/screens/AuthScreen.tsx',
  'src/screens/HomeScreen.tsx',
  'src/screens/BodyScanScreen.tsx',
  'src/screens/ProcessingScreen.tsx',
  'src/screens/AvatarScreen.tsx',
  'src/screens/TryOnScreen.tsx',
  'src/screens/ProductDetailScreen.tsx',
  'src/screens/ProfileScreen.tsx',
];

for (const file of requiredFiles) {
  accessSync(file);
}

console.log('Mobile frontend structure check passed.');
