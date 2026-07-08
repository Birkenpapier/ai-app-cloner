import { Tabs } from 'expo-router';
import { Bell, CircleUser, MessageCircle } from 'lucide-react-native';

import { tokens } from '@/lib/tokens';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: tokens.colors.sidebar },
        tabBarStyle: {
          backgroundColor: tokens.colors.rail,
          borderTopColor: tokens.colors.divider,
          height: 66,
          paddingTop: 8,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: tokens.colors.header,
        tabBarInactiveTintColor: tokens.colors.muted,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      <Tabs.Screen
        name="messages"
        options={{ title: 'Messages', tabBarIcon: ({ color }) => <MessageCircle size={24} color={color} /> }}
      />
      <Tabs.Screen
        name="notifications"
        options={{ title: 'Notifications', tabBarIcon: ({ color }) => <Bell size={24} color={color} /> }}
      />
      <Tabs.Screen
        name="you"
        options={{ title: 'You', tabBarIcon: ({ color }) => <CircleUser size={24} color={color} /> }}
      />
    </Tabs>
  );
}
