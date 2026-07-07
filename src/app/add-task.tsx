import { router } from 'expo-router';
import { ArrowUp, Bell, CalendarDays, Flag, Hash, Tag } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { addTask } from '@/lib/tasks';
import { tokens } from '@/lib/tokens';

// Adding a task is an ON-DEVICE op — it saves via the task store and appears in
// the lists. The toolbar (date / priority / reminder / label) sets the quick-add
// options shown as chips; each control responds.

const DUE = ['', 'Today', 'Tomorrow'];
const PRIORITY = ['', 'P1', 'P2', 'P3'];
const PRIORITY_COLOR = [tokens.colors.secondary, '#dc4c3e', '#eb8909', '#246fe0'];

export default function AddTask() {
  const [title, setTitle] = useState('');
  const [due, setDue] = useState(0);
  const [priority, setPriority] = useState(0);
  const [reminder, setReminder] = useState(false);
  const [labeled, setLabeled] = useState(false);
  const canAdd = title.trim().length > 0;

  const submit = () => {
    if (!canAdd) return;
    addTask(title);
    router.back();
  };

  const chips = [
    due > 0 ? DUE[due] : null,
    priority > 0 ? PRIORITY[priority] : null,
    reminder ? 'Reminder' : null,
    labeled ? 'Label' : null,
  ].filter((c): c is string => c !== null);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <View className="flex-row items-center justify-between px-4 py-3">
        <Pressable onPress={() => router.back()}>
          <Text className="text-[16px] text-secondary">Cancel</Text>
        </Pressable>
        <View className="flex-row items-center gap-1 rounded-full bg-surface2 px-3 py-1">
          <Hash size={14} color={tokens.colors.secondary} />
          <Text className="text-[14px] text-foreground">Inbox</Text>
        </View>
      </View>

      <View className="px-4 pt-2">
        <TextInput
          value={title}
          onChangeText={setTitle}
          autoFocus
          placeholder="e.g. Buy groceries at 5pm"
          placeholderTextColor={tokens.colors.tertiary}
          className="text-[20px] text-foreground"
          onSubmitEditing={submit}
          returnKeyType="done"
        />
        {chips.length > 0 ? (
          <View className="mt-3 flex-row flex-wrap gap-2">
            {chips.map((c) => (
              <View key={c} className="rounded-full bg-surface2 px-2.5 py-1">
                <Text className="text-[13px] text-foreground">{c}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </View>

      <View className="flex-1" />

      <View className="flex-row items-center gap-5 border-t border-separator px-4 pb-2 pt-3">
        <Pressable onPress={() => setDue((d) => (d + 1) % DUE.length)} accessibilityLabel="Set due date">
          <CalendarDays size={22} color={due > 0 ? tokens.colors.red : tokens.colors.secondary} />
        </Pressable>
        <Pressable onPress={() => setPriority((p) => (p + 1) % PRIORITY.length)} accessibilityLabel="Set priority">
          <Flag size={22} color={PRIORITY_COLOR[priority]} />
        </Pressable>
        <Pressable onPress={() => setReminder((r) => !r)} accessibilityLabel="Toggle reminder">
          <Bell size={22} color={reminder ? tokens.colors.red : tokens.colors.secondary} />
        </Pressable>
        <Pressable onPress={() => setLabeled((l) => !l)} accessibilityLabel="Toggle label">
          <Tag size={22} color={labeled ? tokens.colors.red : tokens.colors.secondary} />
        </Pressable>
        <View className="flex-1" />
        <Pressable
          onPress={submit}
          disabled={!canAdd}
          accessibilityLabel="Save task"
          className="h-10 w-10 items-center justify-center rounded-full"
          style={{ backgroundColor: canAdd ? tokens.colors.red : tokens.colors.surface2 }}
        >
          <ArrowUp size={20} color={canAdd ? '#ffffff' : tokens.colors.tertiary} strokeWidth={2.5} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
