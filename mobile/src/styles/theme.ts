import { TextStyle } from 'react-native';

export const colors = {
  background: '#000000',
  surface: '#111111',
  card: '#181818',
  border: '#2A2A2A',
  text: '#FFFFFF',
  muted: '#A6A6A6',
  inverse: '#000000',
  success: '#B7FFD2',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
} as const;

export const typography: Record<string, TextStyle> = {
  display: { fontSize: 42, lineHeight: 48, fontWeight: '900' },
  title: { fontSize: 30, lineHeight: 36, fontWeight: '900' },
  heading: { fontSize: 22, lineHeight: 28, fontWeight: '800' },
  body: { fontSize: 15, lineHeight: 22, fontWeight: '500' },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '700' },
  button: { fontSize: 16, lineHeight: 20, fontWeight: '900' },
};
