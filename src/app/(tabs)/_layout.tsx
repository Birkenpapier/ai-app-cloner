import { Tabs } from 'expo-router';
import { Clock, LayoutTemplate, Star } from 'lucide-react-native';

import { tokens } from '@/lib/tokens';

// Bottom tab bar (light): Recent · Favorites · Templates. Recent is the landing tab.
export const unstable_settings = { initialRouteName: 'recent' };

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: tokens.colors.violet,
        tabBarInactiveTintColor: tokens.colors.tertiary,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: tokens.colors.surface,
          borderTopColor: tokens.colors.border,
          height: 82,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen name="recent" options={{ tabBarIcon: ({ color, size }) => <Clock color={color} size={size} /> }} />
      <Tabs.Screen
        name="favorites"
        options={{ tabBarIcon: ({ color, size }) => <Star color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="templates"
        options={{ tabBarIcon: ({ color, size }) => <LayoutTemplate color={color} size={size} /> }}
      />
    </Tabs>
  );
}
