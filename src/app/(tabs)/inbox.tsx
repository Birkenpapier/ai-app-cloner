import { Inbox as InboxIcon, List, MoreHorizontal } from 'lucide-react-native';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Fab } from '@/components/Fab';
import { TaskRow } from '@/components/TaskRow';
import { useTasks } from '@/lib/tasks';
import { tokens } from '@/lib/tokens';

export default function Inbox() {
  const tasks = useTasks();
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="flex-row items-center justify-between px-4 pb-2 pt-1">
        <Text className="text-[26px] font-bold text-foreground">Inbox</Text>
        <View className="flex-row items-center gap-1 rounded-full bg-surface2 px-3 py-1.5">
          <List size={18} color={tokens.colors.foreground} />
          <MoreHorizontal size={18} color={tokens.colors.foreground} />
        </View>
      </View>

      {tasks.length === 0 ? (
        <View className="flex-1 items-center justify-center px-10">
          <InboxIcon size={60} color="#e5a53b" strokeWidth={1.4} />
          <Text className="mt-6 text-[15px] font-semibold text-foreground">Capture now, plan later</Text>
          <Text className="mt-1 text-center text-[14px] text-secondary">
            Inbox is your go-to spot for quick task entry. Clear your mind now, organize when you&apos;re ready.
          </Text>
        </View>
      ) : (
        <ScrollView className="px-4">
          {tasks.map((t) => (
            <TaskRow key={t.id} task={t} />
          ))}
        </ScrollView>
      )}
      <Fab />
    </SafeAreaView>
  );
}
