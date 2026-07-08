import { router } from 'expo-router';
import { ChevronRight, Plus, Search } from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '@/components/Avatar';
import { PROJECTS, useTasks } from '@/lib/data';

export default function Projects() {
  const { items: tasks } = useTasks();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="flex-row items-center justify-between px-4 pb-3 pt-2">
        <Text className="text-[26px] font-bold text-foreground">Projects</Text>
        <View className="flex-row items-center gap-4">
          <Search size={22} color="#1C1E2E" />
          <Plus size={24} color="#1C1E2E" />
        </View>
      </View>

      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingTop: 6, paddingBottom: 24 }}>
        {PROJECTS.map((p) => {
          const projectTasks = tasks.filter((t) => t.project === p.name);
          const assignees = Array.from(new Set(projectTasks.map((t) => t.assigneeId).filter(Boolean))) as string[];
          const done = projectTasks.filter((t) => t.status === 'done').length;
          const pct = projectTasks.length ? Math.round((done / projectTasks.length) * 100) : 0;
          return (
            <Pressable
              key={p.id}
              onPress={() => router.push(`/board/${p.id}`)}
              accessibilityLabel={`Open ${p.name}`}
              className="mb-3 rounded-card bg-surface p-4"
              style={{
                shadowColor: '#1C1E2E',
                shadowOpacity: 0.06,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 3 },
                elevation: 2,
              }}
            >
              <View className="flex-row items-center gap-3">
                <View className="h-9 w-9 items-center justify-center rounded-lg" style={{ backgroundColor: p.color }}>
                  <Text className="text-[15px] font-bold text-white">{p.name[0]}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-[15px] font-semibold text-foreground">{p.name}</Text>
                  <Text className="text-[12px] text-secondary">
                    {projectTasks.length} {projectTasks.length === 1 ? 'task' : 'tasks'}
                  </Text>
                </View>
                <ChevronRight size={20} color="#B4B7C4" />
              </View>

              <View className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface2">
                <View className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: p.color }} />
              </View>

              <View className="mt-3 flex-row items-center justify-between">
                <View className="flex-row">
                  {assignees.slice(0, 3).map((id, i) => (
                    <View key={id} style={{ marginLeft: i === 0 ? 0 : -8 }}>
                      <Avatar id={id} size={24} />
                    </View>
                  ))}
                </View>
                <Text className="text-[12px] text-secondary">{pct}% done</Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
