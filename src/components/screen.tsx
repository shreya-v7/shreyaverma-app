import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { type ReactNode } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Fonts, Spacing } from '@/constants/theme';
import { screenShell } from '@/constants/scroll';
import { useTheme } from '@/hooks/use-theme';

export function Screen({ children, style }: { children: ReactNode; style?: object }) {
  const theme = useTheme();
  return (
    <View style={[screenShell, { backgroundColor: theme.background }, style]}>
      <SafeAreaView edges={['top', 'left', 'right']} style={screenShell}>
        {children}
      </SafeAreaView>
    </View>
  );
}

export function Header({
  title,
  subtitle,
  right,
  back,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  back?: boolean;
}) {
  const theme = useTheme();
  const router = useRouter();
  return (
    <View style={styles.header}>
      <View style={styles.headerText}>
        {back ? (
          <Pressable
            onPress={() => (router.canGoBack() ? router.back() : router.replace('/space'))}
            hitSlop={10}
            style={styles.backBtn}>
            <Ionicons name="chevron-back" size={18} color={theme.muted} />
            <ThemedText type="small" themeColor="muted">
              Space
            </ThemedText>
          </Pressable>
        ) : null}
        <ThemedText style={styles.headerTitle}>{title}</ThemedText>
        {subtitle ? (
          <ThemedText type="small" themeColor="textSecondary">
            {subtitle}
          </ThemedText>
        ) : null}
      </View>
      {right ? <View>{right}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Spacing.four,
    paddingTop: Platform.select({ android: Spacing.four, default: Spacing.two }),
    paddingBottom: Spacing.three,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },
  headerText: {
    flex: 1,
    gap: 2,
    minWidth: 0,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginBottom: Spacing.one,
    marginLeft: -4,
  },
  headerTitle: {
    fontFamily: Fonts.semibold,
    fontSize: 28,
    letterSpacing: -0.6,
  },
});
