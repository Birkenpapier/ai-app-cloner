import { Check, Circle } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { type Task, toggleTask } from '@/lib/tasks';
import { tokens } from '@/lib/tokens';

// A single task row: circular checkbox (tap to complete, persists) + title.
export function TaskRow({ task }: { task: Task }) {
  return (
    <View className="flex-row items-center gap-3 border-b border-separator py-3">
      <Pressable onPress={() => toggleTask(task.id)} hitSlop={8}>
        {task.done ? (
          <View className="h-[22px] w-[22px] items-center justify-center rounded-full bg-red">
            <Check size={14} color="#ffffff" strokeWidth={3} />
          </View>
        ) : (
          <Circle size={22} color={tokens.colors.tertiary} strokeWidth={1.75} />
        )}
      </Pressable>
      <Text
        className={`flex-1 text-[16px] ${task.done ? 'text-tertiary line-through' : 'text-foreground'}`}
      >
        {task.title}
      </Text>
    </View>
  );
}
