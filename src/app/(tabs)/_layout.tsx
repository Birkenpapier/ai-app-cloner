import { Tabs } from 'expo-router';
import { Calendar, CalendarDays, Inbox, Menu } from 'lucide-react-native';

import { tokens } from '@/lib/tokens';

// Bottom tab bar: Inbox · Today · Upcoming · Browse (Todoist order).
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: tokens.colors.red,
        tabBarInactiveTintColor: tokens.colors.secondary,
        tabBarStyle: {
          backgroundColor: tokens.colors.surface,
          borderTopColor: tokens.colors.separator,
          height: 84,
          paddingTop: 8,
        },
        tabBarLabelStyle: { fontSize: 11 },
      }}
    >
      <Tabs.Screen
        name="inbox"
        options={{ title: 'Inbox', tabBarIcon: ({ color, size }) => <Inbox color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="today"
        options={{ title: 'Today', tabBarIcon: ({ color, size }) => <Calendar color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="upcoming"
        options={{ title: 'Upcoming', tabBarIcon: ({ color, size }) => <CalendarDays color={color} size={size} /> }}
      />
      <Tabs.Screen
        name="browse"
        options={{ title: 'Browse', tabBarIcon: ({ color, size }) => <Menu color={color} size={size} /> }}
      />
    </Tabs>
  );
}
