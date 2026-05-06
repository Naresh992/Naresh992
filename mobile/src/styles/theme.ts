export const colors = {
  background: '#000000',
  surface: '#101010',
  elevated: '#171717',
  border: '#2A2A2A',
  text: '#FFFFFF',
  muted: '#A3A3A3',
  subtle: '#6B6B6B',
  inverse: '#000000',
  accent: '#FFFFFF',
  success: '#D9FFE8',
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
  sm: 10,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
} as const;

export const typography = {
  hero: { fontSize: 40, lineHeight: 44, fontWeight: '800' as const, letterSpacing: -1.6 },
  h1: { fontSize: 30, lineHeight: 36, fontWeight: '800' as const, letterSpacing: -0.8 },
  h2: { fontSize: 22, lineHeight: 28, fontWeight: '700' as const, letterSpacing: -0.3 },
  body: { fontSize: 15, lineHeight: 22, fontWeight: '400' as const },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '500' as const },
  button: { fontSize: 16, lineHeight: 20, fontWeight: '800' as const },
} as const;
