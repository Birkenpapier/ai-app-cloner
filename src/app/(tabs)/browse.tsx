import { router } from 'expo-router';
import { Inbox, type LucideIcon, Search, Settings, Tag } from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { tokens } from '@/lib/tokens';

function Row({ icon: Icon, label, onPress }: { icon: LucideIcon; label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} className="flex-row items-center gap-3 border-b border-separator px-4 py-3.5">
      <Icon size={20} color={tokens.colors.red} />
      <Text className="flex-1 text-[16px] text-foreground">{label}</Text>
    </Pressable>
  );
}

export default function Browse() {
  const toInbox = () => router.push('/inbox');
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="flex-row items-center justify-between px-4 pb-3 pt-1">
        <View className="flex-row items-center gap-2.5">
          <View className="h-8 w-8 items-center justify-center rounded-full bg-[#c0559b]">
            <Text className="text-[13px] font-semibold text-white">HT</Text>
          </View>
          <Text className="text-[17px] font-semibold text-foreground">Hallo</Text>
        </View>
        <Pressable
          onPress={() => router.push('/settings')}
          className="h-8 w-8 items-center justify-center rounded-full bg-surface2"
        >
          <Settings size={17} color={tokens.colors.foreground} />
        </Pressable>
      </View>

      <ScrollView className="px-4">
        <View className="overflow-hidden rounded-card bg-surface">
          <Row icon={Search} label="Search" onPress={toInbox} />
          <Row icon={Tag} label="Filters & Labels" onPress={toInbox} />
        </View>

        <Text className="px-1 pb-2 pt-6 text-[17px] font-semibold text-foreground">My Projects</Text>
        <View className="overflow-hidden rounded-card bg-surface">
          <Row icon={Inbox} label="Inbox" onPress={toInbox} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
