import { router } from 'expo-router';
import { CheckSquare, Clock, ImageIcon, MessageSquare } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { Avatar } from '@/components/Avatar';
import { Tag } from '@/components/Tag';
import type { Task } from '@/lib/data';
import { tokens } from '@/lib/tokens';

// The task card shown in Agenda and on the project Board. Tapping it opens the
// task detail. `showProject` adds the "Marketing Requests" label (Agenda only —
// on a board you're already inside the project).
export function TaskCard({ task, showProject = false }: { task: Task; showProject?: boolean }) {
  return (
    <Pressable
      onPress={() => router.push(`/task/${task.id}`)}
      accessibilityLabel={`Open ${task.title}`}
      className="mb-3 overflow-hidden rounded-card bg-surface"
      style={{
        shadowColor: '#1C1E2E',
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
      }}
    >
      {task.cover ? (
        <View className="h-28 w-full items-center justify-center bg-[#DCE3EC]">
          <ImageIcon size={26} color="#9AA6B4" />
        </View>
      ) : null}

      <View className="p-3.5">
        <View className="flex-row items-start justify-between">
          <View className="flex-1 pr-2">
            {showProject ? (
              <View className="mb-1.5 flex-row items-center gap-1.5">
                <View className="h-3.5 w-3.5 items-center justify-center rounded-[3px] bg-primary">
                  <CheckSquare size={9} color="#ffffff" />
                </View>
                <Text className="text-[12px] text-secondary">{task.project}</Text>
              </View>
            ) : null}
            <Text className="text-[15px] font-semibold leading-[20px] text-foreground">{task.title}</Text>
          </View>
          {task.assigneeId ? <Avatar id={task.assigneeId} size={26} /> : null}
        </View>

        {task.description ? (
          <Text className="mt-1.5 text-[13px] leading-[18px] text-secondary" numberOfLines={2}>
            {task.description}
          </Text>
        ) : null}

        {/* Meta row: due · checklist · comments */}
        <View className="mt-3 flex-row items-center gap-3">
          {task.due ? (
            <View
              className="flex-row items-center gap-1 rounded-md px-2 py-[3px]"
              style={{ backgroundColor: task.dueUrgent ? '#FDE7EC' : tokens.colors.surface2 }}
            >
              <Clock size={12} color={task.dueUrgent ? tokens.colors.pink : tokens.colors.secondary} />
              <Text
                className="text-[11px] font-medium"
                style={{ color: task.dueUrgent ? tokens.colors.pink : tokens.colors.secondary }}
              >
                {task.due}
              </Text>
            </View>
          ) : null}
          {task.checklist ? (
            <View className="flex-row items-center gap-1">
              <CheckSquare size={13} color={tokens.colors.secondary} />
              <Text className="text-[12px] text-secondary">
                {task.checklist[0]}/{task.checklist[1]}
              </Text>
            </View>
          ) : null}
          {task.comments > 0 ? (
            <View className="flex-row items-center gap-1">
              <MessageSquare size={13} color={tokens.colors.secondary} />
              <Text className="text-[12px] text-secondary">{task.comments}</Text>
            </View>
          ) : null}
        </View>

        {task.tags.length > 0 ? (
          <View className="mt-2.5 flex-row flex-wrap gap-1.5">
            {task.tags.map((t) => (
              <Tag key={t.label} label={t.label} kind={t.kind} />
            ))}
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}
