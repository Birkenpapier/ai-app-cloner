import { router } from 'expo-router';
import { ChevronDown, PieChart, Plus, Search } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CategoryIcon } from '@/components/CategoryIcon';
import { categoryOf, useTxns } from '@/lib/transactions';
import { tokens } from '@/lib/tokens';

const money = (n: number) => `${n < 0 ? '-' : n > 0 ? '+' : ''}€${Math.abs(n).toFixed(0)}`;

function Pill({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} className="flex-row items-center gap-1 rounded-full bg-surface2 px-3 py-1.5">
      <Text className="text-[13px] text-foreground">{label}</Text>
      <ChevronDown size={14} color={tokens.colors.secondary} />
    </Pressable>
  );
}

const WALLET_FILTERS = ['All Wallets', 'Cash Wallet', 'Bank Account'];
const PERIODS = ['By months', 'By weeks', 'By days'];

export default function Timeline() {
  const txns = useTxns();
  const total = txns.reduce((s, t) => s + t.amount, 0);
  const barH = Math.min(Math.abs(total) / 150, 1) * 80;
  const [walletFilter, setWalletFilter] = useState(0);
  const [period, setPeriod] = useState(0);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="flex-row items-start justify-between px-4 pt-2">
        <View className="flex-1 items-center pl-6">
          <Text className="text-[24px] font-bold" style={{ color: total < 0 ? tokens.colors.red : tokens.colors.green }}>
            {money(total)}
          </Text>
          <Text className="text-[13px] text-secondary">Cash Flow</Text>
        </View>
        <Pressable onPress={() => router.push('/activity')} hitSlop={8} accessibilityLabel="Search transactions">
          <Search size={22} color={tokens.colors.secondary} />
        </Pressable>
      </View>

      <View className="mt-3 flex-row justify-center gap-2">
        <Pill label={WALLET_FILTERS[walletFilter]} onPress={() => setWalletFilter((w) => (w + 1) % WALLET_FILTERS.length)} />
        <Pill label={PERIODS[period]} onPress={() => setPeriod((p) => (p + 1) % PERIODS.length)} />
      </View>

      {/* Simple month bar chart */}
      <View className="mt-4 px-6">
        {[100, 50, 0].map((v) => (
          <View key={v} className="mb-6 flex-row items-center">
            <Text className="w-8 text-[11px] text-secondary">{v}</Text>
            <View className="flex-1 border-t border-dashed border-border" />
          </View>
        ))}
        <View className="absolute bottom-6 right-8 items-center">
          <View style={{ width: 8, height: barH, backgroundColor: tokens.colors.red, borderRadius: 4 }} />
          <Text className="mt-1 text-[11px] text-secondary">Jul 2026</Text>
        </View>
      </View>

      <View className="mt-2 flex-row justify-center">
        <Pressable
          onPress={() => router.push('/budgets')}
          className="flex-row items-center gap-1.5 rounded-full bg-surface2 px-4 py-2"
          accessibilityLabel="Spending overview"
        >
          <PieChart size={16} color={tokens.colors.green} />
          <Text className="text-[13px] text-foreground">Spending Overview</Text>
        </Pressable>
      </View>

      <View className="mt-3 flex-row justify-between bg-surface px-4 py-2">
        <Text className="text-[13px] text-secondary">Today</Text>
        <Text className="text-[13px] text-secondary">{money(total)}</Text>
      </View>

      <ScrollView className="flex-1">
        {txns.map((t) => {
          const cat = categoryOf(t.category);
          return (
            <View key={t.id} className="flex-row items-center gap-3 px-4 py-3">
              <CategoryIcon category={t.category} />
              <View className="flex-1">
                <Text className="text-[15px] text-foreground">{cat.label}</Text>
                <Text className="text-[12px] text-secondary">{t.wallet}</Text>
              </View>
              <Text className="text-[15px]" style={{ color: t.amount < 0 ? tokens.colors.red : tokens.colors.green }}>
                {money(t.amount)}
              </Text>
            </View>
          );
        })}
      </ScrollView>

      <Pressable
        onPress={() => router.push('/add-transaction')}
        accessibilityLabel="Add transaction"
        className="absolute bottom-4 right-4 h-14 w-14 items-center justify-center rounded-full bg-green"
      >
        <Plus size={28} color="#ffffff" strokeWidth={2.5} />
      </Pressable>
    </SafeAreaView>
  );
}
