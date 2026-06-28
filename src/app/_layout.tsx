import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { Suspense } from 'react';
import { ActivityIndicator, useColorScheme, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Colors } from '@/constants/theme';
import { DATABASE_NAME, migrateDb } from '@/lib/db';

function DbLoading() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
      <ActivityIndicator color={colors.tint} />
    </View>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const navTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Suspense fallback={<DbLoading />}>
        <SQLiteProvider
          databaseName={DATABASE_NAME}
          onInit={migrateDb}
          options={{ enableChangeListener: true }}
          useSuspense>
          <ThemeProvider value={navTheme}>
            <StatusBar style="auto" />
            <Stack screenOptions={{ contentStyle: { backgroundColor: colors.background } }}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="entry/[id]"
                options={{ presentation: 'modal', headerShown: false }}
              />
            </Stack>
          </ThemeProvider>
        </SQLiteProvider>
      </Suspense>
    </GestureHandlerRootView>
  );
}
