import { Wallet as WalletIcon } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTxns } from '@/lib/transactions';
import { tokens } from '@/lib/tokens';

const money = (n: number) => `${n < 0 ? '-' : ''}€${Math.abs(n).toFixed(0)}`;

export default function Wallets() {
  const total = useTxns().reduce((s, t) => s + t.amount, 0);
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <Text className="border-b border-border pb-3 pt-2 text-center text-[17px] font-semibold text-foreground">
        Wallets
      </Text>
      <View className="mx-4 mt-4 flex-row items-center gap-3 rounded-card bg-surface p-4">
        <View className="h-11 w-11 items-center justify-center rounded-full bg-surface2">
          <WalletIcon size={22} color={tokens.colors.green} />
        </View>
        <View className="flex-1">
          <Text className="text-[16px] font-semibold text-foreground">Cash Wallet</Text>
          <Text className="text-[12px] text-secondary">Cash</Text>
        </View>
        <Text className="text-[16px] font-semibold" style={{ color: total < 0 ? tokens.colors.red : tokens.colors.green }}>
          {money(total)}
        </Text>
      </View>
    </SafeAreaView>
  );
}
