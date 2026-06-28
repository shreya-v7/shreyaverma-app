/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#1A1523',
    background: '#FBFAFC',
    backgroundElement: '#F2F0F5',
    backgroundSelected: '#E5E2EC',
    textSecondary: '#65636D',
    border: '#E6E3EC',
    tint: '#7C5CFC',
    tintMuted: '#EEE9FE',
    danger: '#E5484D',
    success: '#30A46C',
    warning: '#F76808',
    priorityLow: '#8E8C95',
    priorityMed: '#F2A20C',
    priorityHigh: '#E5484D',
  },
  dark: {
    text: '#EDEDEF',
    background: '#0B0A0F',
    backgroundElement: '#1A191F',
    backgroundSelected: '#26242C',
    textSecondary: '#A0A0A8',
    border: '#26242C',
    tint: '#9E86FF',
    tintMuted: '#241F38',
    danger: '#FF6369',
    success: '#3DD68C',
    warning: '#FF8B3D',
    priorityLow: '#7E7D86',
    priorityMed: '#FFCA52',
    priorityHigh: '#FF6369',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

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
export const MaxContentWidth = 800;
