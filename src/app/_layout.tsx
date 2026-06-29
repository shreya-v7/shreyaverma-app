import {
  Geist_400Regular,
  Geist_500Medium,
  Geist_600SemiBold,
  Geist_700Bold,
} from '@expo-google-fonts/geist';
import { GeistMono_400Regular, GeistMono_500Medium } from '@expo-google-fonts/geist-mono';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { useFonts } from 'expo-font';
import { SQLiteProvider } from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { LockScreen } from '@/components/lock-screen';
import { PrivacyCover } from '@/components/privacy-cover';
import { Colors } from '@/constants/theme';
import { screenShell } from '@/constants/scroll';
import { DATABASE_NAME, migrateDb } from '@/lib/db';
import { LockProvider, useLock } from '@/lib/lock-context';

function Gate() {
  const { ready, unlocked, active } = useLock();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  if (!ready) {
    return <View style={{ flex: 1, backgroundColor: colors.paper }} />;
  }

  if (!unlocked) {
    return <LockScreen />;
  }

  return (
    <View style={screenShell}>
      <Stack screenOptions={{ contentStyle: { backgroundColor: colors.background, ...screenShell } }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="entry/[id]" options={{ presentation: 'modal', headerShown: false }} />
      </Stack>
      {!active ? <PrivacyCover /> : null}
    </View>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const navTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  const [fontsLoaded] = useFonts({
    Geist_400Regular,
    Geist_500Medium,
    Geist_600SemiBold,
    Geist_700Bold,
    GeistMono_400Regular,
    GeistMono_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <LockProvider>
          <SQLiteProvider
            databaseName={DATABASE_NAME}
            onInit={migrateDb}
            options={{ enableChangeListener: false }}
            useSuspense={false}>
            <ThemeProvider value={navTheme}>
              <StatusBar style="auto" />
              <Gate />
            </ThemeProvider>
          </SQLiteProvider>
        </LockProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
