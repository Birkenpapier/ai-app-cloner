import { router } from 'expo-router';
import { Archive, Bell, ChevronLeft, MoreVertical, Palette, Pin, Plus } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { addNote } from '@/lib/notes';
import { tokens } from '@/lib/tokens';

// Note editor. Google Keep saves on back (no explicit save button) — adding a
// note is an ON-DEVICE op, so it really persists.
export default function NoteEditor() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const saveAndBack = () => {
    if (title.trim() || body.trim()) addNote(title, body);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <View className="h-12 flex-row items-center justify-between px-3">
        <Pressable onPress={saveAndBack} hitSlop={8} accessibilityLabel="Back">
          <ChevronLeft size={26} color={tokens.colors.foreground} />
        </Pressable>
        <View className="flex-row items-center gap-5">
          <Pin size={20} color={tokens.colors.secondary} />
          <Bell size={20} color={tokens.colors.secondary} />
          <Archive size={20} color={tokens.colors.secondary} />
        </View>
      </View>

      <ScrollView className="flex-1 px-4">
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Title"
          placeholderTextColor={tokens.colors.secondary}
          className="pt-2 text-[22px] text-foreground"
        />
        <TextInput
          value={body}
          onChangeText={setBody}
          placeholder="Note"
          placeholderTextColor={tokens.colors.secondary}
          autoFocus
          multiline
          textAlignVertical="top"
          className="mt-3 min-h-[120px] text-[16px] text-foreground"
        />
      </ScrollView>

      <View className="h-12 flex-row items-center gap-5 border-t border-border px-4">
        <Plus size={22} color={tokens.colors.secondary} />
        <Palette size={22} color={tokens.colors.secondary} />
        <Text className="flex-1 text-center text-[13px] text-secondary">Edited just now</Text>
        <MoreVertical size={22} color={tokens.colors.secondary} />
      </View>
    </SafeAreaView>
  );
}
