import { StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextType =
  | 'default'
  | 'title'
  | 'pageTitle'
  | 'sectionTitle'
  | 'siteName'
  | 'small'
  | 'smallBold'
  | 'subtitle'
  | 'label'
  | 'link'
  | 'linkPrimary'
  | 'code';

export type ThemedTextProps = TextProps & {
  type?: ThemedTextType;
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[
        { color: theme[themeColor ?? 'text'] },
        type === 'default' && styles.default,
        type === 'title' && styles.title,
        type === 'pageTitle' && styles.pageTitle,
        type === 'sectionTitle' && styles.sectionTitle,
        type === 'siteName' && styles.siteName,
        type === 'small' && styles.small,
        type === 'smallBold' && styles.smallBold,
        type === 'subtitle' && styles.subtitle,
        type === 'label' && styles.label,
        type === 'link' && styles.link,
        type === 'linkPrimary' && styles.linkPrimary,
        type === 'code' && styles.code,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  small: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 21,
  },
  smallBold: {
    fontFamily: Fonts.semibold,
    fontSize: 14,
    lineHeight: 21,
  },
  default: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    lineHeight: 26,
  },
  title: {
    fontFamily: Fonts.semibold,
    fontSize: 40,
    lineHeight: 44,
    letterSpacing: -1,
  },
  pageTitle: {
    fontFamily: Fonts.medium,
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: -0.5,
  },
  sectionTitle: {
    fontFamily: Fonts.semibold,
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: -0.3,
  },
  siteName: {
    fontFamily: Fonts.semibold,
    fontSize: 28,
    lineHeight: 32,
    letterSpacing: -0.6,
  },
  subtitle: {
    fontFamily: Fonts.semibold,
    fontSize: 22,
    lineHeight: 30,
    letterSpacing: -0.4,
  },
  label: {
    fontFamily: Fonts.monoMedium,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  link: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    lineHeight: 22,
  },
  linkPrimary: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    lineHeight: 22,
  },
  code: {
    fontFamily: Fonts.mono,
    fontSize: 12,
    lineHeight: 18,
  },
});
