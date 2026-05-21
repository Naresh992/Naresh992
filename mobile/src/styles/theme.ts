import { TextStyle } from 'react-native';

export const colors = {
  background: '#000000',
  surface: '#0D0D0D',
  surfaceSoft: '#141414',
  card: '#181818',
  cardElevated: '#202020',
  border: '#2A2A2A',
  borderStrong: '#3A3A3A',
  text: '#FFFFFF',
  muted: '#A7A7A7',
  subtle: '#6F6F6F',
  inverse: '#000000',
  success: '#B7FFD2',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const radius = {
  sm: 10,
  md: 12,
  lg: 16,
  pill: 999,
} as const;

export const typography: Record<string, TextStyle> = {
  display: { fontSize: 44, lineHeight: 50, fontWeight: '900', letterSpacing: -1.4 },
  title: { fontSize: 32, lineHeight: 38, fontWeight: '900', letterSpacing: -0.9 },
  heading: { fontSize: 22, lineHeight: 28, fontWeight: '800', letterSpacing: -0.35 },
  subheading: { fontSize: 17, lineHeight: 24, fontWeight: '700' },
  body: { fontSize: 15, lineHeight: 22, fontWeight: '400' },
  bodyMedium: { fontSize: 15, lineHeight: 22, fontWeight: '600' },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '700', letterSpacing: 0.2 },
  micro: { fontSize: 10, lineHeight: 13, fontWeight: '800', letterSpacing: 1.1 },
  button: { fontSize: 15, lineHeight: 20, fontWeight: '900', letterSpacing: 0.1 },
};

export const shadows = {
  soft: {
    shadowColor: '#FFFFFF',
    shadowOpacity: 0.06,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
} as const;
