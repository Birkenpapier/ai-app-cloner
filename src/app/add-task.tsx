import { router } from 'expo-router';
import { Check } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ME, useTasks } from '@/lib/data';
import { makeId } from '@/lib/store';
import { tokens } from '@/lib/tokens';

// New-task composer (modal). Creating a task is ON-DEVICE: it persists and shows
// up instantly in Agenda, Focus, and the Board (shared store).
export default function AddTask() {
  const { add } = useTasks();
  const [title, setTitle] = useState('');

  const save = () => {
    const t = title.trim();
    if (!t) return;
    add({
      id: makeId(),
      title: t,
      project: 'Marketing Requests',
      section: 'Requests',
      description: '',
      status: 'open',
      tags: [{ label: 'Open', kind: 'open' }],
      comments: 0,
      assigneeId: ME.id,
      today: true,
    });
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'bottom']}>
      <View className="flex-row items-center justify-between px-4 py-3">
        <Pressable onPress={() => router.back()} accessibilityLabel="Cancel" hitSlop={8}>
          <Text className="text-[16px] text-secondary">Cancel</Text>
        </Pressable>
        <Text className="text-[16px] font-semibold text-foreground">New Task</Text>
        <Pressable
          onPress={save}
          accessibilityLabel="Save task"
          disabled={!title.trim()}
          className="flex-row items-center gap-1 rounded-full px-4 py-1.5"
          style={{ backgroundColor: title.trim() ? tokens.colors.primary : tokens.colors.surface2 }}
        >
          <Check size={15} color={title.trim() ? '#ffffff' : tokens.colors.tertiary} />
          <Text
            className="text-[14px] font-semibold"
            style={{ color: title.trim() ? '#ffffff' : tokens.colors.tertiary }}
          >
            Add
          </Text>
        </Pressable>
      </View>

      <View className="px-4 pt-4">
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="What needs to be done?"
          placeholderTextColor={tokens.colors.tertiary}
          className="text-[18px] text-foreground"
          autoFocus
          onSubmitEditing={save}
          accessibilityLabel="Task title"
          returnKeyType="done"
        />
        <View className="mt-4 flex-row items-center gap-2">
          <View className="h-3.5 w-3.5 items-center justify-center rounded-[3px] bg-primary">
            <Check size={9} color="#ffffff" />
          </View>
          <Text className="text-[13px] text-secondary">Marketing Requests · Requests</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
