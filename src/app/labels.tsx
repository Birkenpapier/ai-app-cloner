import { router } from 'expo-router';
import { Plus, Tag, X } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { tokens } from '@/lib/tokens';

// Labels are local state: Create adds a label, each row deletes. No dead rows.
export default function Labels() {
  const [labels, setLabels] = useState<string[]>(['Test']);
  const [n, setN] = useState(1);
  const add = () => {
    setLabels((l) => [...l, `Label ${n}`]);
    setN((v) => v + 1);
  };
  const remove = (i: number) => setLabels((l) => l.filter((_, idx) => idx !== i));

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="h-14 flex-row items-center px-4">
        <Pressable onPress={() => router.back()} hitSlop={8} accessibilityLabel="Close">
          <X size={24} color={tokens.colors.foreground} />
        </Pressable>
        <Text className="flex-1 text-center text-[18px] text-secondary">Edit labels</Text>
        <View className="w-6" />
      </View>

      <Pressable onPress={add} className="mt-2 flex-row items-center gap-4 px-5 py-3" accessibilityLabel="Create new label">
        <Plus size={22} color={tokens.colors.blue} />
        <Text className="text-[16px] text-foreground">Create new label</Text>
      </Pressable>

      <ScrollView>
        {labels.map((label, i) => (
          <View key={`${label}-${i}`} className="flex-row items-center gap-4 px-5 py-3">
            <Tag size={20} color={tokens.colors.secondary} />
            <Text className="flex-1 text-[16px] text-foreground">{label}</Text>
            <Pressable onPress={() => remove(i)} hitSlop={8} accessibilityLabel={`Delete ${label}`}>
              <X size={18} color={tokens.colors.secondary} />
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
