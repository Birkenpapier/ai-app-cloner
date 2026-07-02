import { ChevronRight, CreditCard, Grid2x2, HelpCircle, type LucideIcon, Settings, Tag, Users } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { tokens } from '@/lib/tokens';

function Row({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <View className="flex-row items-center gap-3 border-b border-border px-4 py-3.5">
      <Icon size={20} color={tokens.colors.green} />
      <Text className="flex-1 text-[16px] text-foreground">{label}</Text>
      <ChevronRight size={18} color={tokens.colors.secondary} />
    </View>
  );
}

export default function More() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <Text className="border-b border-border pb-3 pt-2 text-center text-[17px] font-semibold text-foreground">
        More
      </Text>
      <View className="mt-3">
        <Row icon={Grid2x2} label="Categories" />
        <Row icon={Tag} label="Labels" />
        <Row icon={CreditCard} label="Bank Accounts" />
        <Row icon={Users} label="Shared Wallets" />
        <Row icon={Settings} label="Settings" />
        <Row icon={HelpCircle} label="Help & Support" />
      </View>
    </SafeAreaView>
  );
}
