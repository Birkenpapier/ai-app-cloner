import { router } from 'expo-router';
import {
  Bell,
  Check,
  ChevronRight,
  Gauge,
  type LucideIcon,
  Moon,
  RefreshCw,
  Sparkles,
  Volume2,
  Zap,
} from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { tokens } from '@/lib/tokens';

// Every control on this screen does something: toggles flip and persist for the
// session, value rows cycle, and Log Out returns to the auth screen. No dead rows.

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
    <View className="flex-row items-center gap-3 border-b border-separator px-4 py-3">
      <Icon size={20} color={tokens.colors.red} />
      <Text className="flex-1 text-[16px] text-foreground">{label}</Text>
      <Switch value={value} onValueChange={onValueChange} trackColor={{ true: tokens.colors.red, false: '#48484a' }} />
    </View>
  );
}

function CycleRow({
  icon: Icon,
  label,
  value,
  onPress,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-3 border-b border-separator px-4 py-3"
    >
      <Icon size={20} color={tokens.colors.red} />
      <Text className="flex-1 text-[16px] text-foreground">{label}</Text>
      <Text className="text-[15px] text-secondary">{value}</Text>
      <ChevronRight size={18} color={tokens.colors.tertiary} />
    </Pressable>
  );
}

function SectionLabel({ children }: { children: string }) {
  return <Text className="px-4 pb-1 pt-5 text-[13px] text-secondary">{children}</Text>;
}

const THEMES = ['System', 'Light', 'Dark'];
const START_PAGES = ['Inbox', 'Today', 'Upcoming'];

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [dailyReview, setDailyReview] = useState(false);
  const [quickAdd, setQuickAdd] = useState(true);
  const [sound, setSound] = useState(false);
  const [theme, setTheme] = useState(0);
  const [startPage, setStartPage] = useState(0);

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
        <View className="mx-4 mt-2 flex-row items-center gap-3 rounded-card bg-surface px-4 py-3.5">
          <View className="h-11 w-11 items-center justify-center rounded-full bg-[#c0559b]">
            <Text className="text-[16px] font-semibold text-white">HT</Text>
          </View>
          <View className="flex-1">
            <Text className="text-[16px] font-semibold text-foreground">Hallo</Text>
            <Text className="text-[13px] text-secondary">hallo@example.com</Text>
          </View>
        </View>

        <SectionLabel>Personalization</SectionLabel>
        <View className="mx-4 overflow-hidden rounded-card bg-surface">
          <CycleRow icon={Moon} label="Theme" value={THEMES[theme]} onPress={() => setTheme((t) => (t + 1) % THEMES.length)} />
          <CycleRow
            icon={Zap}
            label="Start Page"
            value={START_PAGES[startPage]}
            onPress={() => setStartPage((s) => (s + 1) % START_PAGES.length)}
          />
          <ToggleRow icon={Sparkles} label="Quick Add" value={quickAdd} onValueChange={setQuickAdd} />
        </View>

        <SectionLabel>Notifications</SectionLabel>
        <View className="mx-4 overflow-hidden rounded-card bg-surface">
          <ToggleRow icon={Bell} label="Push Notifications" value={notifications} onValueChange={setNotifications} />
          <ToggleRow icon={Gauge} label="Reminders" value={reminders} onValueChange={setReminders} />
          <ToggleRow icon={Sparkles} label="Daily Review" value={dailyReview} onValueChange={setDailyReview} />
          <ToggleRow icon={Volume2} label="Sound" value={sound} onValueChange={setSound} />
        </View>

        <View className="mx-4 mt-5 flex-row items-center gap-3 rounded-card bg-surface px-4 py-3">
          <RefreshCw size={20} color={tokens.colors.red} />
          <Text className="flex-1 text-[16px] text-foreground">Sync</Text>
          <Text className="text-[15px] text-secondary">Just now</Text>
        </View>

        <Pressable
          onPress={() => router.replace('/')}
          className="mx-4 mb-3 mt-5 items-center rounded-card bg-surface py-3.5"
        >
          <Text className="text-[16px] text-red">Log Out</Text>
        </Pressable>
        <Text className="pb-8 text-center text-[12px] text-tertiary">Todoist clone · v1.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
