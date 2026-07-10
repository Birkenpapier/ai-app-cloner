import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNotes } from '@/backend/generated';

// v2.0 backend-mode DEMO (feat/v2-backend). This screen reads the seeded notes
// reactively (useCollection) and creates/deletes them through the in-process
// tRPC API (api.notes.*), proving the generated typed backend end to end.
//
// A v1 blank-template home does NOT import src/backend — this wiring is the
// `--backend=mock` example and stays off main's blank canvas.
export default function Home() {
  const { items, create, remove } = useNotes();
  const [title, setTitle] = useState('');

  const add = () => {
    const next = title.trim();
    if (!next) return;
    void create({ title: next, body: null, pinned: false, color: 'default', folderId: null, createdAt: Date.now() });
    setTitle('');
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="gap-3 px-4 pt-4">
        <Text className="text-2xl font-semibold text-foreground">Notes</Text>
        <View className="flex-row gap-2">
          <TextInput
            className="flex-1 rounded-lg border border-border px-3 py-2 text-foreground"
            placeholder="New note title"
            placeholderTextColor="#71717a"
            value={title}
            onChangeText={setTitle}
            onSubmitEditing={add}
          />
          <Pressable accessibilityLabel="Add note" onPress={add} className="rounded-lg bg-primary px-4 py-2">
            <Text className="font-semibold text-primary-foreground">Add</Text>
          </Pressable>
        </View>
      </View>
      <ScrollView className="flex-1 px-4">
        <View className="gap-2 py-3">
          {items.length === 0 ? (
            <Text className="text-muted-foreground">No notes yet.</Text>
          ) : (
            items.map((note) => (
              <View
                key={note.id}
                className="flex-row items-center justify-between rounded-xl border border-border px-4 py-3"
              >
                <View className="flex-1 gap-0.5">
                  <Text className="text-base font-medium text-foreground">{note.title}</Text>
                  {note.body ? <Text className="text-sm text-muted-foreground">{note.body}</Text> : null}
                </View>
                <Pressable accessibilityLabel={`Delete ${note.title}`} onPress={() => void remove(note.id)}>
                  <Text className="px-2 text-muted-foreground">✕</Text>
                </Pressable>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
