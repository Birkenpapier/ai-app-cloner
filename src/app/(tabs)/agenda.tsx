import { router } from 'expo-router';
import { ArrowUpDown, ChevronDown, Plus, Power, Search, User } from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { Avatar } from '@/components/Avatar';
import { GradientHeader } from '@/components/GradientHeader';
import { TaskCard } from '@/components/TaskCard';
import { ME, useTasks } from '@/lib/data';

// A stat pill in the gradient header (My Tasks / Guest / Focus).
function StatCard({
  label,
  count,
  bg,
  fg,
  icon,
}: {
  label: string;
  count: number;
  bg: string;
  fg: string;
  icon: React.ReactNode;
}) {
  return (
    <View className="min-w-[104px] flex-1 rounded-xl2 px-3.5 py-3" style={{ backgroundColor: bg }}>
      <View className="mb-2 h-6 w-6 items-center justify-center rounded-full bg-white/25">{icon}</View>
      <Text className="text-[22px] font-bold" style={{ color: fg }}>
        {count}
      </Text>
      <Text className="text-[12px]" style={{ color: fg, opacity: 0.85 }}>
        {label}
      </Text>
    </View>
  );
}

export default function Agenda() {
  const { items: tasks } = useTasks();
  const today = tasks.filter((t) => t.today);

  return (
    <View className="flex-1 bg-background">
      <GradientHeader>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <Avatar id={ME.id} size={30} />
            <Search size={20} color="#ffffff" />
          </View>
          <View className="flex-row items-center gap-4">
            <Pressable onPress={() => router.replace('/')} accessibilityLabel="Log out" hitSlop={8}>
              <Power size={20} color="#ffffff" />
            </Pressable>
            <Pressable onPress={() => router.push('/add-task')} accessibilityLabel="Add task" hitSlop={8}>
              <Plus size={22} color="#ffffff" />
            </Pressable>
          </View>
        </View>

        <View className="mt-4 flex-row items-center gap-1">
          <Text className="text-[26px] font-bold text-white">Agenda</Text>
          <ChevronDown size={22} color="#ffffff" />
        </View>

        <View className="mt-4 flex-row gap-2.5">
          <StatCard
            label="My Tasks"
            count={today.length}
            bg="#ffffff"
            fg="#1C1E2E"
            icon={<User size={13} color="#0087F2" />}
          />
          <StatCard
            label="Guest"
            count={4}
            bg="rgba(0,0,0,0.28)"
            fg="#ffffff"
            icon={<User size={13} color="#ffffff" />}
          />
          <StatCard
            label="Focus"
            count={2}
            bg="#F5A623"
            fg="#ffffff"
            icon={<Text style={{ fontSize: 12 }}>🔥</Text>}
          />
        </View>
      </GradientHeader>

      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingTop: 14, paddingBottom: 24 }}>
        <View className="mb-3 flex-row items-center gap-1">
          <ArrowUpDown size={13} color="#8A8D9C" />
          <Text className="text-[13px] font-medium text-secondary">A-Z</Text>
        </View>
        {today.map((t) => (
          <TaskCard key={t.id} task={t} showProject />
        ))}
      </ScrollView>
    </View>
  );
}
