import '../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Cloned from Apple Passwords: a stack rooted at the Passwords grid, with two
// modal sheets (New Password, More About Passkeys). Headers are custom-built
// per screen (LargeTitleHeader / modal bars) for iOS fidelity on web.
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="all" />
        <Stack.Screen name="passkeys" />
        <Stack.Screen name="codes" />
        <Stack.Screen name="security" />
        <Stack.Screen name="deleted" />
        <Stack.Screen name="new-password" options={{ presentation: 'modal' }} />
        <Stack.Screen name="about-passkeys" options={{ presentation: 'modal' }} />
      </Stack>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
