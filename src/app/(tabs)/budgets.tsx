import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { tokens } from '@/lib/tokens';

// Budgets (s-12).
export default function Budgets() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <Text className="border-b border-border pb-3 pt-2 text-center text-[17px] font-semibold text-foreground">
        Budgets
      </Text>

      <View className="px-4 pt-4">
        <Text className="text-[16px] font-semibold text-foreground">Test</Text>
        <Text className="mt-1 text-[14px] text-secondary">
          <Text className="font-semibold text-green">€111</Text> left out of €111
        </Text>
        <View className="mt-3 h-8 justify-center rounded-md bg-surface2 px-3">
          <Text className="text-[12px] text-secondary">0%</Text>
        </View>
        <View className="mt-2 flex-row justify-between">
          <Text className="text-[12px] text-secondary">Today</Text>
          <Text className="text-[12px] text-secondary">August 1, 2026</Text>
        </View>
      </View>

      <View className="mt-6 items-center">
        <View className="rounded-full border border-green px-6 py-3">
          <Text className="text-[15px] font-semibold text-green">Create a New Budget</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
