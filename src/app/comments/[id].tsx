import { router, useLocalSearchParams } from 'expo-router';
import { ArrowRight, X } from 'lucide-react-native';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '@/components/Avatar';
import { ME, person, useMapComments } from '@/lib/data';
import { makeId } from '@/lib/store';
import { tokens } from '@/lib/tokens';

export default function Comments() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const mapId = id ?? 'campaign';
  const { items: comments, add } = useMapComments(mapId);
  const [draft, setDraft] = useState('');

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    add({ id: makeId(), actorId: ME.id, text, time: 'just now', createdAt: Date.now() });
    setDraft('');
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'bottom']}>
      <View className="flex-row items-center justify-center border-b border-border py-3">
        <Pressable
          onPress={() => router.back()}
          accessibilityLabel="Close comments"
          hitSlop={8}
          className="absolute left-4"
        >
          <X size={22} color={tokens.colors.foreground} />
        </Pressable>
        <Text className="text-[16px] font-semibold text-foreground">Comments</Text>
      </View>

      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingVertical: 16 }}>
          {comments.map((c) => {
            const actor = person(c.actorId);
            return (
              <View key={c.id} className="mb-5 flex-row gap-2.5">
                <Avatar id={c.actorId} size={34} />
                <View className="flex-1">
                  <Text className="text-[12px] text-tertiary">{c.time}</Text>
                  <Text className="text-[13px] text-foreground">
                    <Text className="font-semibold">{actor.name}</Text> said
                  </Text>
                  <View className="mt-1.5 self-start rounded-2xl rounded-tl-sm bg-surface2 px-3.5 py-2.5">
                    <Text className="text-[14px] leading-[19px] text-foreground">{c.text}</Text>
                  </View>
                </View>
              </View>
            );
          })}
          {comments.length === 0 ? (
            <Text className="mt-10 text-center text-[13px] text-secondary">
              No comments yet. Start the conversation.
            </Text>
          ) : null}
        </ScrollView>

        <View className="flex-row items-center gap-2 border-t border-border px-4 py-3">
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder="Sounds awesome!"
            placeholderTextColor={tokens.colors.tertiary}
            className="h-10 flex-1 text-[15px] text-foreground"
            onSubmitEditing={send}
            accessibilityLabel="Comment input"
            returnKeyType="send"
          />
          <Pressable
            onPress={send}
            accessibilityLabel="Send comment"
            className="h-10 w-10 items-center justify-center rounded-full bg-node-blue"
          >
            <ArrowRight size={20} color="#ffffff" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
