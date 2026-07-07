import { router } from 'expo-router';
import { CheckSquare, Image as ImageIcon, Menu, Mic, Pen, Plus, Rows2, Search, User } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { type Note, useNotes } from '@/lib/notes';
import { tokens } from '@/lib/tokens';

function NoteCard({ note }: { note: Note }) {
  const isDefault = note.color === tokens.colors.note.default;
  return (
    <View
      className="mb-3 rounded-card p-3"
      style={{ backgroundColor: note.color, borderWidth: isDefault ? 1 : 0, borderColor: tokens.colors.border }}
    >
      {note.title ? <Text className="mb-1 text-[15px] font-semibold text-foreground">{note.title}</Text> : null}
      {note.body ? <Text className="text-[13px] leading-[19px] text-foreground/90">{note.body}</Text> : null}
    </View>
  );
}

export default function Notes() {
  const notes = useNotes();
  const [query, setQuery] = useState('');
  const [cols, setCols] = useState(2);
  const q = query.trim().toLowerCase();
  const filtered = q ? notes.filter((n) => `${n.title} ${n.body}`.toLowerCase().includes(q)) : notes;
  const left = filtered.filter((_, i) => i % 2 === 0);
  const right = filtered.filter((_, i) => i % 2 === 1);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {/* Search header */}
      <View className="px-3 pb-2 pt-1">
        <View className="h-12 flex-row items-center rounded-search bg-search px-3">
          <Pressable onPress={() => router.push('/menu')} hitSlop={8} accessibilityLabel="Open menu">
            <Menu size={22} color={tokens.colors.foreground} />
          </Pressable>
          <View className="ml-3 flex-1 flex-row items-center">
            <Search size={18} color={tokens.colors.secondary} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search your notes"
              placeholderTextColor={tokens.colors.secondary}
              className="ml-2 flex-1 text-[15px] text-foreground"
            />
          </View>
          <Pressable onPress={() => setCols((c) => (c === 2 ? 1 : 2))} hitSlop={8} accessibilityLabel="Toggle layout">
            <Rows2 size={20} color={tokens.colors.secondary} />
          </Pressable>
          <Pressable
            onPress={() => router.push('/menu')}
            hitSlop={8}
            accessibilityLabel="Account"
            className="ml-3 h-7 w-7 items-center justify-center rounded-full bg-blue/20"
          >
            <User size={16} color={tokens.colors.blue} />
          </Pressable>
        </View>
      </View>

      {filtered.length === 0 ? (
        <View className="flex-1 items-center justify-center px-10">
          <Text className="text-center text-[15px] text-secondary">
            {q ? 'No matching notes' : 'Notes you add appear here'}
          </Text>
        </View>
      ) : (
        <ScrollView className="flex-1 px-3" contentContainerClassName="pt-1 pb-24">
          {cols === 2 ? (
            <View className="flex-row gap-3">
              <View className="flex-1">{left.map((n) => <NoteCard key={n.id} note={n} />)}</View>
              <View className="flex-1">{right.map((n) => <NoteCard key={n.id} note={n} />)}</View>
            </View>
          ) : (
            <View>{filtered.map((n) => <NoteCard key={n.id} note={n} />)}</View>
          )}
        </ScrollView>
      )}

      {/* Bottom toolbar + FAB */}
      <View className="absolute inset-x-0 bottom-0 h-16 flex-row items-center gap-6 border-t border-border bg-surface px-6">
        <Pressable onPress={() => router.push('/note')} hitSlop={8} accessibilityLabel="New checklist">
          <CheckSquare size={22} color={tokens.colors.secondary} />
        </Pressable>
        <Pressable onPress={() => router.push('/note')} hitSlop={8} accessibilityLabel="New drawing">
          <Pen size={22} color={tokens.colors.secondary} />
        </Pressable>
        <Pressable onPress={() => router.push('/note')} hitSlop={8} accessibilityLabel="New voice note">
          <Mic size={22} color={tokens.colors.secondary} />
        </Pressable>
        <Pressable onPress={() => router.push('/note')} hitSlop={8} accessibilityLabel="New image note">
          <ImageIcon size={22} color={tokens.colors.secondary} />
        </Pressable>
      </View>
      <Pressable
        onPress={() => router.push('/note')}
        accessibilityLabel="Add note"
        className="absolute bottom-20 right-4 h-14 w-14 items-center justify-center rounded-2xl bg-foreground"
      >
        <Plus size={28} color={tokens.colors.background} strokeWidth={2.5} />
      </Pressable>
    </SafeAreaView>
  );
}
