import '../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { tokens } from '@/lib/tokens';

// Cloned from MindMeister: a login entry, a bottom-tab app (Recent / Favorites /
// Templates), the map editor, and a comments modal pushed over it.
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
        <Stack.Screen name="map/[id]" />
        <Stack.Screen name="comments/[id]" options={{ presentation: 'modal' }} />
        <Stack.Screen name="new-map" options={{ presentation: 'modal' }} />
      </Stack>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
