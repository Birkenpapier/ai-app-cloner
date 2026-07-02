import { router } from 'expo-router';
import { ArrowUp, Bell, CalendarDays, Flag, Hash, Tag } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { addTask } from '@/lib/tasks';
import { tokens } from '@/lib/tokens';

// Quick-add sheet. Adding a task is an ON-DEVICE op — it really saves (persists
// via the task store) and instantly appears in the Today/Inbox lists.
export default function AddTask() {
  const [title, setTitle] = useState('');
  const canAdd = title.trim().length > 0;

  const submit = () => {
    if (!canAdd) return;
    addTask(title);
    router.back();
  };

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
      </View>

      <View className="flex-1" />

      <View className="flex-row items-center gap-5 border-t border-separator px-4 pb-2 pt-3">
        <CalendarDays size={22} color={tokens.colors.secondary} />
        <Flag size={22} color={tokens.colors.secondary} />
        <Bell size={22} color={tokens.colors.secondary} />
        <Tag size={22} color={tokens.colors.secondary} />
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
