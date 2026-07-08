import { router, useLocalSearchParams } from 'expo-router';
import {
  CalendarClock,
  Check,
  MoreHorizontal,
  Pin,
  Send,
  SmilePlus,
  Timer,
  UserPlus,
} from 'lucide-react-native';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '@/components/Avatar';
import { activityForTask, type Activity, ME, person, useComments, useTasks } from '@/lib/data';
import { makeId } from '@/lib/store';
import { tokens } from '@/lib/tokens';

function EventIcon({ text }: { text: string }) {
  if (text.includes('assigned'))
    return (
      <View className="h-7 w-7 items-center justify-center rounded-full bg-primary">
        <UserPlus size={14} color="#ffffff" />
      </View>
    );
  return (
    <View className="h-7 w-7 items-center justify-center rounded-full bg-amber">
      <CalendarClock size={14} color="#ffffff" />
    </View>
  );
}

function ActivityRow({ a }: { a: Activity }) {
  const actor = person(a.actorId);
  if (a.kind === 'comment') {
    return (
      <View className="mb-5 flex-row gap-2.5">
        <Avatar id={a.actorId} size={30} />
        <View className="flex-1">
          <Text className="text-[11px] font-semibold uppercase tracking-wide text-tertiary">{a.time}</Text>
          <Text className="mt-0.5 text-[13px] text-foreground">
            <Text className="font-semibold">{actor.name.split(' ')[0]}</Text> said
          </Text>
          <View className="mt-1.5 self-start rounded-2xl rounded-tl-sm bg-surface2 px-3 py-2.5">
            <Text className="text-[13px] leading-[19px] text-foreground">{a.text}</Text>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View className="mb-5 flex-row items-center gap-2.5">
      <EventIcon text={a.text} />
      <View className="flex-1">
        <Text className="text-[11px] font-semibold uppercase tracking-wide text-tertiary">{a.time}</Text>
        <Text className="mt-0.5 text-[13px] text-foreground">
          <Text className="font-semibold">{actor.name.split(' ')[0]}</Text> {a.text}
        </Text>
      </View>
    </View>
  );
}

export default function TaskDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { items: tasks, update } = useTasks();
  const { items: comments, add: addComment } = useComments();
  const [draft, setDraft] = useState('');

  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-surface">
        <Text className="text-secondary">Task not found.</Text>
      </SafeAreaView>
    );
  }

  const feed = activityForTask(task.id, comments);
  const done = task.status === 'done';

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    addComment({ id: makeId(), taskId: task.id, actorId: ME.id, text, createdAt: Date.now() });
    setDraft('');
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <Pressable onPress={() => router.back()} accessibilityLabel="Close task" hitSlop={8}>
          <Text className="text-[22px] text-foreground">✕</Text>
        </Pressable>
        <View className="flex-row items-center gap-3">
          <View className="flex-row items-center gap-1 rounded-full bg-[#12B5A6] px-3 py-1.5">
            <Pin size={13} color="#ffffff" fill="#ffffff" />
            <Text className="text-[12px] font-bold uppercase tracking-wide text-white">Upcoming</Text>
          </View>
          <Timer size={20} color="#1C1E2E" />
        </View>
      </View>

      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 24 }}>
          <Text className="mt-1 text-[20px] font-bold leading-[26px] text-foreground">{task.title}</Text>
          <View className="mt-1.5 flex-row items-center gap-1.5">
            <View className="h-3.5 w-3.5 items-center justify-center rounded-[3px] bg-primary">
              <Check size={9} color="#ffffff" />
            </View>
            <Text className="text-[12px] text-secondary">{task.project}</Text>
          </View>

          <View className="my-4 h-px bg-border" />

          <Text className="mb-3 text-[13px] font-semibold uppercase tracking-wide text-secondary">Activity</Text>

          {/* Comment composer */}
          <View className="mb-5 flex-row items-center gap-2.5">
            <Avatar id={ME.id} size={30} />
            <View className="flex-1 flex-row items-center rounded-full bg-surface2 px-3">
              <TextInput
                value={draft}
                onChangeText={setDraft}
                placeholder="Add Comment..."
                placeholderTextColor={tokens.colors.tertiary}
                className="h-10 flex-1 text-[14px] text-foreground"
                onSubmitEditing={send}
                accessibilityLabel="Comment input"
                returnKeyType="send"
              />
              {draft.trim().length > 0 ? (
                <Pressable onPress={send} accessibilityLabel="Send comment" hitSlop={8}>
                  <Send size={18} color={tokens.colors.primary} />
                </Pressable>
              ) : null}
            </View>
          </View>

          {feed.map((a) => (
            <ActivityRow key={a.id} a={a} />
          ))}
        </ScrollView>

        {/* Bottom action bar */}
        <View className="flex-row items-center justify-between border-t border-border bg-surface px-4 py-3">
          <SmilePlus size={22} color={tokens.colors.secondary} />
          <Pressable
            onPress={() => update(task.id, { status: done ? 'in-progress' : 'done' })}
            accessibilityLabel="Complete Task"
            className="flex-row items-center gap-2 rounded-full px-6 py-2.5"
            style={{ backgroundColor: done ? tokens.colors.green : tokens.colors.surface2 }}
          >
            <Check size={17} color={done ? '#ffffff' : tokens.colors.foreground} />
            <Text className="text-[14px] font-semibold" style={{ color: done ? '#ffffff' : tokens.colors.foreground }}>
              {done ? 'Completed' : 'Complete Task'}
            </Text>
          </Pressable>
          <MoreHorizontal size={22} color={tokens.colors.secondary} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
