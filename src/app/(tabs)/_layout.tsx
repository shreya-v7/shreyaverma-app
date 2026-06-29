import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

import { screenShell } from '@/constants/scroll';
import { Fonts } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function TabsLayout() {
  const theme = useTheme();

  return (
    <View style={screenShell}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.ink,
          tabBarInactiveTintColor: theme.faint,
          tabBarStyle: {
            backgroundColor: theme.paper,
            borderTopColor: theme.line,
          },
          tabBarItemStyle: {
            flex: 1,
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontFamily: Fonts.medium,
            letterSpacing: 0.2,
          },
          sceneStyle: screenShell,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} />,
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: 'About',
            tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={22} color={color} />,
          }}
        />
        <Tabs.Screen
          name="diary"
          options={{
            title: 'Diary',
            tabBarIcon: ({ color }) => <Ionicons name="book-outline" size={22} color={color} />,
          }}
        />
        <Tabs.Screen
          name="projects"
          options={{
            title: 'Projects',
            tabBarIcon: ({ color }) => <Ionicons name="grid-outline" size={22} color={color} />,
          }}
        />
      </Tabs>
    </View>
  );
}
