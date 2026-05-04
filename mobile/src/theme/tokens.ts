export const colors = {
  background: '#000000',
  surface: '#111111',
  surfaceAlt: '#1C1C1C',
  primaryText: '#FFFFFF',
  secondaryText: '#B3B3B3',
  border: '#2A2A2A',
  accent: '#FFFFFF',
  success: '#5CFFB0',
  warning: '#FFD166',
  error: '#FF5C7A',
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
  xl: 24,
  round: 999,
} as const;

export const typography = {
  heading1: { fontSize: 32, lineHeight: 38, fontWeight: '700' as const },
  heading2: { fontSize: 24, lineHeight: 30, fontWeight: '700' as const },
  title: { fontSize: 18, lineHeight: 24, fontWeight: '600' as const },
  body: { fontSize: 14, lineHeight: 20, fontWeight: '400' as const },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '400' as const },
} as const;

export const motion = {
  fast: 150,
  normal: 250,
  slow: 360,
  easing: 'easeInOut',
} as const;
