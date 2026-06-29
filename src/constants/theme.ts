// Monochrome design system mirrored from shreyaverma.com (shreyaverma-v3).
// Strict grayscale "paper / ink" palette with Geist Sans + Geist Mono.
// Legacy keys (tint, danger, etc.) are preserved so the private productivity
// screens keep working, remapped onto the monochrome scale.

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    // Site tokens (match CSS variables on the website)
    ink: '#111111',
    muted: '#525252',
    faint: '#8a8a8a',
    paper: '#ffffff',
    panel: '#f7f7f7',
    line: 'rgba(17, 17, 17, 0.12)',

    // Legacy aliases used across existing screens
    text: '#111111',
    background: '#ffffff',
    backgroundElement: '#f7f7f7',
    backgroundSelected: '#ededed',
    textSecondary: '#525252',
    border: 'rgba(17, 17, 17, 0.12)',
    tint: '#111111',
    tintMuted: '#f0f0f0',
    onTint: '#ffffff',

    // Functional signals (kept subtle for the private space)
    danger: '#b42318',
    success: '#1a7f4b',
    warning: '#9a6700',
    priorityLow: '#8a8a8a',
    priorityMed: '#525252',
    priorityHigh: '#111111',
  },
  dark: {
    ink: '#f5f5f5',
    muted: '#c7c7c7',
    faint: '#9a9a9a',
    paper: '#090909',
    panel: '#141414',
    line: 'rgba(255, 255, 255, 0.12)',

    text: '#f5f5f5',
    background: '#090909',
    backgroundElement: '#141414',
    backgroundSelected: '#1f1f1f',
    textSecondary: '#c7c7c7',
    border: 'rgba(255, 255, 255, 0.12)',
    tint: '#f5f5f5',
    tintMuted: '#1a1a1a',
    onTint: '#090909',

    danger: '#ff6b6b',
    success: '#4ade80',
    warning: '#fbbf24',
    priorityLow: '#9a9a9a',
    priorityMed: '#c7c7c7',
    priorityHigh: '#f5f5f5',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

// Geist family names match the keys loaded via expo-font in the root layout.
export const Fonts = {
  regular: 'Geist_400Regular',
  medium: 'Geist_500Medium',
  semibold: 'Geist_600SemiBold',
  bold: 'Geist_700Bold',
  mono: 'GeistMono_400Regular',
  monoMedium: 'GeistMono_500Medium',

  // Legacy aliases
  sans: 'Geist_400Regular',
  serif: Platform.select({ ios: 'ui-serif', default: 'serif' }) ?? 'serif',
  rounded: 'Geist_500Medium',
};

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;

// The website centers content in a narrow 640px column.
export const MaxContentWidth = 640;
