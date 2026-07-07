import { router } from 'expo-router';
import { Archive, Bell, ChevronLeft, Palette, Pin } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { addNote } from '@/lib/notes';
import { tokens } from '@/lib/tokens';

// Note editor. Keep saves on back (no explicit save button). The palette really
// recolors the note and the color is saved; pin / reminder / archive toggle.
const COLORS = [
  tokens.colors.note.default,
  tokens.colors.note.olive,
  tokens.colors.note.teal,
  tokens.colors.note.brown,
];

export default function NoteEditor() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [colorIdx, setColorIdx] = useState(0);
  const [pinned, setPinned] = useState(false);
  const [reminder, setReminder] = useState(false);
  const [archived, setArchived] = useState(false);
  const color = COLORS[colorIdx];
  const isDefault = color === tokens.colors.note.default;

  const saveAndBack = () => {
    if (title.trim() || body.trim()) addNote(title, body, color);
    router.back();
  };

  return (
    <SafeAreaView
      className="flex-1"
      edges={['top', 'bottom']}
      style={{ backgroundColor: isDefault ? tokens.colors.background : color }}
    >
      <View className="h-12 flex-row items-center justify-between px-3">
        <Pressable onPress={saveAndBack} hitSlop={8} accessibilityLabel="Back">
          <ChevronLeft size={26} color={tokens.colors.foreground} />
        </Pressable>
        <View className="flex-row items-center gap-5">
          <Pressable onPress={() => setPinned((v) => !v)} hitSlop={8} accessibilityLabel="Pin note">
            <Pin size={20} color={pinned ? tokens.colors.blue : tokens.colors.secondary} />
          </Pressable>
          <Pressable onPress={() => setReminder((v) => !v)} hitSlop={8} accessibilityLabel="Add reminder">
            <Bell size={20} color={reminder ? tokens.colors.blue : tokens.colors.secondary} />
          </Pressable>
          <Pressable onPress={() => setArchived((v) => !v)} hitSlop={8} accessibilityLabel="Archive note">
            <Archive size={20} color={archived ? tokens.colors.blue : tokens.colors.secondary} />
          </Pressable>
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
        <Pressable onPress={() => setColorIdx((i) => (i + 1) % COLORS.length)} hitSlop={8} accessibilityLabel="Change note color">
          <Palette size={22} color={tokens.colors.secondary} />
        </Pressable>
        <Text className="flex-1 text-[13px] text-secondary">Edited just now</Text>
      </View>
    </SafeAreaView>
  );
}
