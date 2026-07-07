import { router } from 'expo-router';
import { Bell, ChevronRight, ListChecks, type LucideIcon, Moon, PiggyBank, Wallet } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { tokens } from '@/lib/tokens';

function NavRow({ icon: Icon, label, onPress }: { icon: LucideIcon; label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} className="flex-row items-center gap-3 border-b border-border px-4 py-3.5">
      <Icon size={20} color={tokens.colors.green} />
      <Text className="flex-1 text-[16px] text-foreground">{label}</Text>
      <ChevronRight size={18} color={tokens.colors.secondary} />
    </Pressable>
  );
}

function ToggleRow({
  icon: Icon,
  label,
  value,
  onValueChange,
}: {
  icon: LucideIcon;
  label: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
}) {
  return (
    <View className="flex-row items-center gap-3 border-b border-border px-4 py-3">
      <Icon size={20} color={tokens.colors.green} />
      <Text className="flex-1 text-[16px] text-foreground">{label}</Text>
      <Switch value={value} onValueChange={onValueChange} trackColor={{ true: tokens.colors.green, false: '#3a3d40' }} />
    </View>
  );
}

export default function More() {
  const [notifications, setNotifications] = useState(true);
  const [dark, setDark] = useState(true);
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <Text className="border-b border-border pb-3 pt-2 text-center text-[17px] font-semibold text-foreground">More</Text>
      <ScrollView className="mt-3">
        <NavRow icon={Wallet} label="Wallets" onPress={() => router.push('/wallets')} />
        <NavRow icon={PiggyBank} label="Budgets" onPress={() => router.push('/budgets')} />
        <NavRow icon={ListChecks} label="Activity" onPress={() => router.push('/activity')} />

        <Text className="px-4 pb-1 pt-5 text-[13px] text-secondary">Preferences</Text>
        <ToggleRow icon={Bell} label="Notifications" value={notifications} onValueChange={setNotifications} />
        <ToggleRow icon={Moon} label="Dark Mode" value={dark} onValueChange={setDark} />

        <Pressable onPress={() => router.replace('/')} className="mx-4 mb-3 mt-6 items-center rounded-card bg-surface py-3.5">
          <Text className="text-[16px] text-red">Log Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
