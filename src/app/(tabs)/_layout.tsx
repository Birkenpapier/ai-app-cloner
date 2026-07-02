import { Tabs } from 'expo-router';
import { Bell, List, MoreHorizontal, PiggyBank, Wallet } from 'lucide-react-native';

import { tokens } from '@/lib/tokens';

// Bottom tabs: Timeline · Wallets · Budgets · Activity · More (Spendee order).
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: tokens.colors.green,
        tabBarInactiveTintColor: tokens.colors.secondary,
        tabBarStyle: {
          backgroundColor: tokens.colors.background,
          borderTopColor: tokens.colors.border,
          height: 84,
          paddingTop: 8,
        },
        tabBarLabelStyle: { fontSize: 11 },
      }}
    >
      <Tabs.Screen name="timeline" options={{ title: 'Timeline', tabBarIcon: ({ color, size }) => <List color={color} size={size} /> }} />
      <Tabs.Screen name="wallets" options={{ title: 'Wallets', tabBarIcon: ({ color, size }) => <Wallet color={color} size={size} /> }} />
      <Tabs.Screen name="budgets" options={{ title: 'Budgets', tabBarIcon: ({ color, size }) => <PiggyBank color={color} size={size} /> }} />
      <Tabs.Screen name="activity" options={{ title: 'Activity', tabBarIcon: ({ color, size }) => <Bell color={color} size={size} /> }} />
      <Tabs.Screen name="more" options={{ title: 'More', tabBarIcon: ({ color, size }) => <MoreHorizontal color={color} size={size} /> }} />
    </Tabs>
  );
}
