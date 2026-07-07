import { router } from 'expo-router';
import { CalendarDays, ChevronRight, Wallet } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CategoryIcon } from '@/components/CategoryIcon';
import { addTxn, CATEGORIES, type CategoryKey } from '@/lib/transactions';
import { tokens } from '@/lib/tokens';

// Add-expense sheet. Saving is an ON-DEVICE op — the transaction persists and the
// timeline total updates. Wallet cycles (and is saved with the txn); date cycles.
const WALLETS = ['Cash Wallet', 'Bank Account', 'Savings'];
const DATES = ['Today', 'Yesterday', 'Earlier'];

export default function AddTransaction() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<CategoryKey>('food');
  const [wallet, setWallet] = useState(0);
  const [date, setDate] = useState(0);
  const value = parseFloat(amount.replace(',', '.'));
  const canSave = !isNaN(value) && value > 0;

  const save = () => {
    if (!canSave) return;
    addTxn(category, -value, WALLETS[wallet]);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <View className="flex-row items-center justify-between px-4 py-3">
        <Pressable onPress={() => router.back()}>
          <Text className="text-[16px] text-secondary">Cancel</Text>
        </Pressable>
        <Text className="text-[17px] font-semibold text-foreground">Add Expense</Text>
        <View className="w-12" />
      </View>

      {/* Amount */}
      <View className="items-center py-8">
        <View className="flex-row items-center">
          <Text className="text-[40px] font-bold text-red">€</Text>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            autoFocus
            placeholder="0"
            placeholderTextColor={tokens.colors.secondary}
            className="min-w-[80px] text-[40px] font-bold text-red"
          />
        </View>
      </View>

      {/* Category picker */}
      <Text className="px-4 pb-2 text-[13px] text-secondary">Category</Text>
      <View className="flex-row flex-wrap gap-3 px-4">
        {CATEGORIES.map((c) => (
          <Pressable
            key={c.key}
            onPress={() => setCategory(c.key)}
            accessibilityLabel={`Category ${c.label}`}
            className="items-center gap-1 rounded-card p-2"
            style={{ borderWidth: category === c.key ? 2 : 0, borderColor: tokens.colors.green }}
          >
            <CategoryIcon category={c.key} size={44} />
            <Text className="text-[11px] text-secondary">{c.label}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        onPress={() => setWallet((w) => (w + 1) % WALLETS.length)}
        accessibilityLabel="Change wallet"
        className="mx-4 mt-4 flex-row items-center gap-3 rounded-card bg-surface px-4 py-3"
      >
        <Wallet size={20} color={tokens.colors.secondary} />
        <Text className="flex-1 text-[15px] text-foreground">{WALLETS[wallet]}</Text>
        <ChevronRight size={18} color={tokens.colors.secondary} />
      </Pressable>

      <Pressable
        onPress={() => setDate((d) => (d + 1) % DATES.length)}
        accessibilityLabel="Change date"
        className="mx-4 mt-2 flex-row items-center gap-3 rounded-card bg-surface px-4 py-3"
      >
        <CalendarDays size={20} color={tokens.colors.secondary} />
        <Text className="flex-1 text-[15px] text-foreground">{DATES[date]}</Text>
        <ChevronRight size={18} color={tokens.colors.secondary} />
      </Pressable>

      <View className="flex-1" />
      <Pressable
        onPress={save}
        disabled={!canSave}
        accessibilityLabel="Save transaction"
        className="mx-4 mb-2 h-14 items-center justify-center rounded-full"
        style={{ backgroundColor: canSave ? tokens.colors.green : tokens.colors.surface2 }}
      >
        <Text className="text-[16px] font-semibold" style={{ color: canSave ? '#ffffff' : tokens.colors.secondary }}>
          Save
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
