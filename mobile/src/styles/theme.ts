import { TextStyle } from 'react-native';

export const colors = {
  background: '#000000',
  surface: '#0B0B0B',
  elevated: '#141414',
  card: '#1C1C1C',
  border: '#2D2D2D',
  text: '#FFFFFF',
  muted: '#B8B8B8',
  subtle: '#777777',
  inverse: '#000000',
  accent: '#FFFFFF',
  success: '#CCFFE2',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
} as const;

export const typography: Record<string, TextStyle> = {
  display: { fontSize: 46, lineHeight: 50, fontWeight: '900', letterSpacing: -2.2 },
  hero: { fontSize: 38, lineHeight: 43, fontWeight: '900', letterSpacing: -1.4 },
  h1: { fontSize: 30, lineHeight: 36, fontWeight: '800', letterSpacing: -0.8 },
  h2: { fontSize: 22, lineHeight: 28, fontWeight: '800', letterSpacing: -0.3 },
  body: { fontSize: 15, lineHeight: 22, fontWeight: '400' },
  bodyStrong: { fontSize: 15, lineHeight: 22, fontWeight: '800' },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '600' },
  micro: { fontSize: 10, lineHeight: 13, fontWeight: '700', letterSpacing: 0.7 },
  button: { fontSize: 16, lineHeight: 20, fontWeight: '900' },
};

export const shadows = {
  panel: {
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 4,
  },
} as const;
