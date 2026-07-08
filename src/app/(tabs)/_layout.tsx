import { Tabs } from 'expo-router';
import { Bell, CheckSquare, LayoutGrid, Target } from 'lucide-react-native';

import { tokens } from '@/lib/tokens';

// Bottom tab bar (dark), matching the Agenda/Notifications screenshots:
// Notifications · Focus · Agenda · Projects. Agenda is the landing tab.
export const unstable_settings = { initialRouteName: 'agenda' };

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: tokens.colors.primary,
        tabBarInactiveTintColor: tokens.colors.tabbarMuted,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: tokens.colors.tabbar,
          borderTopWidth: 0,
          height: 82,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="notifications"
        options={{ tabBarIcon: ({ color, size }) => <Bell color={color} size={size} /> }}
      />
      <Tabs.Screen name="focus" options={{ tabBarIcon: ({ color, size }) => <Target color={color} size={size} /> }} />
      <Tabs.Screen
        name="agenda"
        options={{ tabBarIcon: ({ color, size }) => <CheckSquare color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="projects"
        options={{ tabBarIcon: ({ color, size }) => <LayoutGrid color={color} size={size} /> }}
      />
    </Tabs>
  );
}
