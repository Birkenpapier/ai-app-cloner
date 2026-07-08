import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Placeholder home screen — the blank canvas. Running `/clone-app` with a folder
// of screenshots replaces this (and adds sibling routes) with the cloned screens.
export default function Home() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center gap-3 px-6">
        <Text className="text-2xl font-semibold text-foreground">ai-app-cloner</Text>
        <Text className="text-center text-base text-muted-foreground">
          Blank canvas. Drop screenshots into <Text className="font-mono">docs/screenshots/</Text> and run{' '}
          <Text className="font-mono">/clone-app</Text> to generate this app&apos;s screens here.
        </Text>
      </View>
    </SafeAreaView>
  );
}
