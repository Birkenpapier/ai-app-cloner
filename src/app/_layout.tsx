import '../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { tokens } from '@/lib/tokens';

// Cloned from Spendee: onboarding -> a 5-tab expense tracker (Timeline / Wallets /
// Budgets / Activity / More) with an add-transaction sheet.
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{ headerShown: false, contentStyle: { backgroundColor: tokens.colors.background } }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="add-transaction" options={{ presentation: 'modal' }} />
      </Stack>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
