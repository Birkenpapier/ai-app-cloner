import { router } from 'expo-router';
import { Pen, Plus, Tag, X } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { tokens } from '@/lib/tokens';

// Edit labels (k-04).
export default function Labels() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="h-14 flex-row items-center px-4">
        <Pressable onPress={() => router.back()} hitSlop={8} accessibilityLabel="Close">
          <X size={24} color={tokens.colors.foreground} />
        </Pressable>
        <Text className="flex-1 text-center text-[18px] text-secondary">Edit labels</Text>
        <View className="w-6" />
      </View>

      <View className="mt-2 flex-row items-center gap-4 px-5 py-3">
        <Plus size={22} color={tokens.colors.blue} />
        <Text className="text-[16px] text-foreground">Create new label</Text>
      </View>

      <View className="flex-row items-center gap-4 px-5 py-3">
        <Tag size={20} color={tokens.colors.secondary} />
        <Text className="flex-1 text-[16px] text-foreground">Test</Text>
        <Pen size={18} color={tokens.colors.secondary} />
      </View>
    </SafeAreaView>
  );
}
