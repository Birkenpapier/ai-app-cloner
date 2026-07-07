import { Plus, X } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { tokens } from '@/lib/tokens';

type Budget = { id: string; name: string; limit: number };

// Budgets are local: Create adds one, each row deletes. No dead controls.
export default function Budgets() {
  const [budgets, setBudgets] = useState<Budget[]>([{ id: 'b1', name: 'Groceries', limit: 111 }]);
  const [n, setN] = useState(1);
  const add = () => {
    setBudgets((b) => [...b, { id: `b${Date.now()}`, name: `Budget ${n}`, limit: 100 }]);
    setN((v) => v + 1);
  };
  const remove = (id: string) => setBudgets((b) => b.filter((x) => x.id !== id));

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <Text className="border-b border-border pb-3 pt-2 text-center text-[17px] font-semibold text-foreground">Budgets</Text>
      <ScrollView className="flex-1">
        {budgets.map((b) => (
          <View key={b.id} className="border-b border-border px-4 py-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-[16px] font-semibold text-foreground">{b.name}</Text>
              <Pressable onPress={() => remove(b.id)} hitSlop={8} accessibilityLabel={`Delete ${b.name}`}>
                <X size={18} color={tokens.colors.secondary} />
              </Pressable>
            </View>
            <Text className="mt-1 text-[14px] text-secondary">
              <Text className="font-semibold text-green">€{b.limit}</Text> left out of €{b.limit}
            </Text>
            <View className="mt-3 h-8 justify-center rounded-md bg-surface2 px-3">
              <Text className="text-[12px] text-secondary">0%</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View className="items-center pb-6 pt-4">
        <Pressable
          onPress={add}
          className="flex-row items-center gap-2 rounded-full border border-green px-6 py-3"
          accessibilityLabel="Create a new budget"
        >
          <Plus size={18} color={tokens.colors.green} />
          <Text className="text-[15px] font-semibold text-green">Create a New Budget</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
