import { Target } from 'lucide-react-native';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TaskCard } from '@/components/TaskCard';
import { useTasks } from '@/lib/data';

// Focus tab: the tasks you're actively working on (in-progress), pulled together
// so you can zero in. Reads the same on-device store as Agenda and the Board.
export default function Focus() {
  const { items: tasks } = useTasks();
  const inFocus = tasks.filter((t) => t.status === 'in-progress');

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="px-4 pb-2 pt-2">
        <Text className="text-[26px] font-bold text-foreground">Focus</Text>
        <Text className="mt-0.5 text-[13px] text-secondary">What you’re actively working on right now.</Text>
      </View>

      {inFocus.length === 0 ? (
        <View className="flex-1 items-center justify-center px-10">
          <Target size={60} color="#B4B7C4" strokeWidth={1.4} />
          <Text className="mt-5 text-[15px] font-semibold text-foreground">Nothing in focus yet</Text>
          <Text className="mt-1 text-center text-[13px] text-secondary">
            Move a task to In Progress and it shows up here.
          </Text>
        </View>
      ) : (
        <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingTop: 8, paddingBottom: 24 }}>
          {inFocus.map((t) => (
            <TaskCard key={t.id} task={t} showProject />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
