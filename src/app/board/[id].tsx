import { router, useLocalSearchParams } from 'expo-router';
import { ChevronDown, MoveRight, Plus, Search, SlidersHorizontal, X } from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TaskCard } from '@/components/TaskCard';
import { BOARD_SECTIONS, projectById, useTasks } from '@/lib/data';

const SECTION_COLOR: Record<string, string> = {
  Requests: '#22B14C',
  'In Progress': '#0087F2',
  Review: '#F5A623',
  Done: '#8A8D9C',
};

function SectionHeader({ name, count }: { name: string; count: number }) {
  return (
    <View
      className="mb-3 flex-row items-center gap-2 rounded-lg px-3 py-2"
      style={{ backgroundColor: SECTION_COLOR[name] ?? '#22B14C' }}
    >
      <MoveRight size={16} color="#ffffff" />
      <Text className="flex-1 text-[14px] font-semibold text-white">{name}</Text>
      <View className="rounded-full bg-white/25 px-2 py-[1px]">
        <Text className="text-[12px] font-semibold text-white">{count}</Text>
      </View>
      <ChevronDown size={16} color="#ffffff" />
    </View>
  );
}

export default function Board() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { items: tasks } = useTasks();
  const project = projectById(id);
  const projectTasks = tasks.filter((t) => t.project === project.name);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="flex-row items-center justify-between border-b border-border bg-surface px-4 py-3">
        <Pressable onPress={() => router.back()} accessibilityLabel="Close board" hitSlop={8}>
          <X size={22} color="#1C1E2E" />
        </Pressable>
        <Text className="text-[16px] font-semibold text-foreground">{project.name}</Text>
        <View className="flex-row items-center gap-4">
          <SlidersHorizontal size={19} color="#1C1E2E" />
          <Search size={19} color="#1C1E2E" />
        </View>
      </View>

      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingTop: 14, paddingBottom: 96 }}>
        {BOARD_SECTIONS.map((section) => {
          const sectionTasks = projectTasks.filter((t) => t.section === section);
          if (sectionTasks.length === 0 && section !== 'Requests') return null;
          return (
            <View key={section} className="mb-2">
              <SectionHeader name={section} count={sectionTasks.length} />
              {sectionTasks.map((t) => (
                <TaskCard key={t.id} task={t} />
              ))}
            </View>
          );
        })}
      </ScrollView>

      <Pressable
        onPress={() => router.push('/add-task')}
        accessibilityLabel="Add task"
        className="absolute bottom-8 left-1/2 h-14 w-14 -translate-x-7 items-center justify-center rounded-full bg-primary"
        style={{
          shadowColor: '#0087F2',
          shadowOpacity: 0.4,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 6,
        }}
      >
        <Plus size={28} color="#ffffff" />
      </Pressable>
    </SafeAreaView>
  );
}
