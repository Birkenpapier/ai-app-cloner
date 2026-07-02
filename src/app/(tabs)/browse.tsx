import { router } from 'expo-router';
import {
  Bell,
  ChevronDown,
  ChevronRight,
  Gem,
  LayoutGrid,
  Pencil,
  Plus,
  Search,
  Settings,
  TrendingUp,
  Users,
} from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { tokens } from '@/lib/tokens';

function Row({ icon: Icon, label }: { icon: typeof Search; label: string }) {
  return (
    <View className="flex-row items-center gap-3 border-b border-separator px-4 py-3.5">
      <Icon size={20} color={tokens.colors.red} />
      <Text className="flex-1 text-[16px] text-foreground">{label}</Text>
    </View>
  );
}

export default function Browse() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="flex-row items-center justify-between px-4 pb-3 pt-1">
        <View className="flex-row items-center gap-2.5">
          <View className="h-8 w-8 items-center justify-center rounded-full bg-[#c0559b]">
            <Text className="text-[13px] font-semibold text-white">HT</Text>
          </View>
          <Text className="text-[17px] font-semibold text-foreground">Hallo</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <View className="h-8 w-8 items-center justify-center rounded-full bg-surface2">
            <Bell size={17} color={tokens.colors.foreground} />
          </View>
          <Pressable
            onPress={() => router.push('/settings')}
            className="h-8 w-8 items-center justify-center rounded-full bg-surface2"
          >
            <Settings size={17} color={tokens.colors.foreground} />
          </Pressable>
        </View>
      </View>

      <ScrollView className="px-4">
        <View className="overflow-hidden rounded-card bg-surface">
          <Row icon={Search} label="Search" />
          <Row icon={LayoutGrid} label="Filters & Labels" />
          <Row icon={TrendingUp} label="Reporting" />
        </View>

        <View className="flex-row items-center justify-between px-1 pb-2 pt-6">
          <View className="flex-row items-center gap-1">
            <Text className="text-[17px] font-semibold text-foreground">My Projects</Text>
            <ChevronRight size={16} color={tokens.colors.secondary} />
          </View>
          <View className="flex-row items-center gap-3">
            <Plus size={20} color={tokens.colors.secondary} />
            <ChevronDown size={20} color={tokens.colors.secondary} />
          </View>
        </View>

        <View className="overflow-hidden rounded-card bg-surface">
          <Row icon={Pencil} label="Manage Projects" />
        </View>

        <View className="mt-4 overflow-hidden rounded-card bg-surface">
          <Row icon={Users} label="Add a Team" />
          <Row icon={Gem} label="Browse Templates" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
