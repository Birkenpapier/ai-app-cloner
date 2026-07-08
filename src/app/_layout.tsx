import '../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Root layout. `/clone-app` rewrites this with the cloned app's navigation
// (tabs / stack / drawer) derived from the inferred screen graph. Keep the
// GestureHandlerRootView wrapper so swipe / drag / reorder gestures work out of
// the box (react-native-gesture-handler throws without it).
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
