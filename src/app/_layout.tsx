import '../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { tokens } from '@/lib/tokens';

// Cloned from Google Keep: a notes grid with a drawer (Notes / Labels / Archive /
// Bin / Settings) and a note editor.
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{ headerShown: false, contentStyle: { backgroundColor: tokens.colors.background } }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="note" options={{ presentation: 'modal' }} />
        <Stack.Screen name="menu" options={{ presentation: 'transparentModal', animation: 'fade' }} />
        <Stack.Screen name="labels" options={{ presentation: 'modal' }} />
      </Stack>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
