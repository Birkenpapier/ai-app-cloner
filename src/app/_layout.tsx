import '../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { tokens } from '@/lib/tokens';

// Cloned from Todoist: a login entry screen, a bottom-tab app (Inbox / Today /
// Upcoming / Browse), and modal/detail screens over it.
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: tokens.colors.background },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="add-task" options={{ presentation: 'modal' }} />
        <Stack.Screen name="settings" />
      </Stack>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
