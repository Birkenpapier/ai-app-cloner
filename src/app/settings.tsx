import { router } from 'expo-router';
import {
  AlarmClock,
  AlignLeft,
  Bell,
  Calendar,
  Check,
  ChevronRight,
  CreditCard,
  Gauge,
  Gift,
  HelpCircle,
  Info,
  type LucideIcon,
  Mic,
  Palette,
  RefreshCw,
  Settings as Gear,
  Smartphone,
  UserCircle,
  Zap,
} from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { tokens } from '@/lib/tokens';

function Row({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value?: string }) {
  return (
    <View className="flex-row items-center gap-3 border-b border-separator px-4 py-3">
      <Icon size={20} color={tokens.colors.red} />
      <Text className="flex-1 text-[16px] text-foreground">{label}</Text>
      {value ? <Text className="text-[15px] text-secondary">{value}</Text> : null}
      <ChevronRight size={18} color={tokens.colors.tertiary} />
    </View>
  );
}

function SectionLabel({ children }: { children: string }) {
  return <Text className="px-4 pb-1 pt-5 text-[13px] text-secondary">{children}</Text>;
}

export default function Settings() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="flex-row items-center justify-between px-4 py-3">
        <View className="w-9" />
        <Text className="text-[17px] font-semibold text-foreground">Settings</Text>
        <Pressable
          onPress={() => router.back()}
          className="h-8 w-8 items-center justify-center rounded-full bg-[#e8a598]"
        >
          <Check size={18} color="#7a2e22" strokeWidth={3} />
        </Pressable>
      </View>

      <ScrollView>
        <View className="mx-4 overflow-hidden rounded-card bg-surface">
          <Row icon={UserCircle} label="Account" />
          <Row icon={Gear} label="General" />
          <Row icon={CreditCard} label="Subscription" />
          <Row icon={Calendar} label="Calendar" />
        </View>

        <SectionLabel>Personalization</SectionLabel>
        <View className="mx-4 overflow-hidden rounded-card bg-surface">
          <Row icon={Palette} label="Theme" value="Todoist" />
          <Row icon={Smartphone} label="App Icon" value="Todoist" />
          <Row icon={AlignLeft} label="Navigation" />
          <Row icon={Zap} label="Quick Add" />
        </View>

        <SectionLabel>Productivity</SectionLabel>
        <View className="mx-4 overflow-hidden rounded-card bg-surface">
          <Row icon={Gauge} label="Productivity" />
          <Row icon={AlarmClock} label="Reminders" />
          <Row icon={Bell} label="Notifications" />
        </View>

        <View className="mx-4 mt-5 overflow-hidden rounded-card bg-surface">
          <Row icon={Mic} label="Siri" />
        </View>

        <View className="mx-4 mt-5 overflow-hidden rounded-card bg-surface">
          <Row icon={HelpCircle} label="Help & Feedback" />
          <Row icon={Info} label="About" />
          <Row icon={AlignLeft} label="Open Logs" />
          <Row icon={Gift} label="What's New" />
          <Row icon={RefreshCw} label="Sync" value="22 seconds ago" />
        </View>

        <View className="mx-4 mb-3 mt-5 items-center rounded-card bg-surface py-3.5">
          <Text className="text-[16px] text-red">Log Out</Text>
        </View>
        <Text className="pb-8 text-center text-[12px] text-tertiary">
          Logged in as: hallo@example.com
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
