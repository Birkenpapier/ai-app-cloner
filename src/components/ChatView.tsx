import { router } from 'expo-router';
import {
  ChevronLeft,
  Hash,
  Pencil,
  Phone,
  PlusCircle,
  Search,
  Send,
  Smile,
  Trash2,
  Users,
  Video,
  X,
} from 'lucide-react-native';
import { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '@/components/Avatar';
import { EMOJIS, type Message, ME, person, useMessages } from '@/lib/data';
import { makeId } from '@/lib/store';
import { tokens, type Status } from '@/lib/tokens';

// One message. Consecutive messages from the same author are "grouped" (no
// repeated avatar/name), matching Discord. A message you own can be edited in
// place; anyone's can be reacted to.
function MessageRow({
  message,
  grouped,
  editing,
  onLongPress,
  onCommitEdit,
  onToggleReaction,
}: {
  message: Message;
  grouped: boolean;
  editing: boolean;
  onLongPress: () => void;
  onCommitEdit: (text: string) => void;
  onToggleReaction: (emoji: string) => void;
}) {
  const author = person(message.authorId);
  const [draft, setDraft] = useState(message.text);
  return (
    <View className={grouped ? 'px-4 py-0.5' : 'px-4 pb-0.5 pt-3'}>
      <Pressable onLongPress={onLongPress} delayLongPress={350} accessibilityLabel={`msg ${message.text}`}>
        <View className="flex-row">
          {grouped ? (
            <View className="w-10" />
          ) : (
            <Avatar name={author.name} tint={author.tint} size={40} ringColor={tokens.colors.background} />
          )}
          <View className="ml-3 flex-1">
            {grouped ? null : (
              <View className="flex-row items-center gap-2">
                <Text className="text-[15px] font-semibold" style={{ color: author.tint }}>
                  {author.name}
                </Text>
                {author.bot ? (
                  <View className="rounded bg-blurple px-1">
                    <Text className="text-[9px] font-bold text-white">BOT</Text>
                  </View>
                ) : null}
                <Text className="text-[11px] text-muted">{message.time}</Text>
              </View>
            )}

            {editing ? (
              <TextInput
                autoFocus
                value={draft}
                onChangeText={setDraft}
                onSubmitEditing={() => onCommitEdit(draft)}
                onBlur={() => onCommitEdit(draft)}
                accessibilityLabel="Edit message input"
                returnKeyType="done"
                selectTextOnFocus
                className="mt-0.5 rounded-md bg-composer px-2 py-1 text-[15px] text-foreground"
              />
            ) : (
              <Text className="text-[15px] leading-[21px] text-foreground">
                {message.text}
                {message.edited ? <Text className="text-[10px] text-muted"> (edited)</Text> : null}
              </Text>
            )}

            {message.reactions && message.reactions.length > 0 ? (
              <View className="mt-1 flex-row flex-wrap gap-1.5">
                {message.reactions.map((r) => (
                  <Pressable
                    key={r.emoji}
                    onPress={() => onToggleReaction(r.emoji)}
                    accessibilityLabel={`React ${r.emoji}`}
                    className="flex-row items-center gap-1 rounded-lg border px-2 py-0.5"
                    style={{
                      backgroundColor: r.me ? 'rgba(88,101,242,0.18)' : '#2B2D31',
                      borderColor: r.me ? tokens.colors.blurple : 'transparent',
                    }}
                  >
                    <Text className="text-[13px]">{r.emoji}</Text>
                    <Text className="text-[12px] font-semibold" style={{ color: r.me ? '#c9cdfb' : tokens.colors.muted }}>
                      {r.count}
                    </Text>
                  </Pressable>
                ))}
              </View>
            ) : null}
          </View>
        </View>
      </Pressable>
    </View>
  );
}

type Header = { variant: 'channel' | 'dm'; title: string; tint?: string; status?: Status; subtitle?: string };

export function ChatView({ channelId, header }: { channelId: string; header: Header }) {
  const { items: messages, add, update, remove } = useMessages(channelId);
  const [draft, setDraft] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [actionId, setActionId] = useState<string | null>(null);
  const scrollRef = useRef<ScrollView>(null);

  const actionMsg = messages.find((m) => m.id === actionId) ?? null;

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    add({ id: makeId(), channelId, authorId: ME.id, text, time: 'now', createdAt: Date.now() });
    setDraft('');
    requestAnimationFrame(() => scrollRef.current?.scrollToEnd({ animated: true }));
  };

  const commitEdit = (id: string, text: string) => {
    setEditingId(null);
    const current = messages.find((m) => m.id === id);
    const next = text.trim();
    if (!current || !next || next === current.text) return;
    update(id, { text: next, edited: true });
  };

  const del = (id: string) => {
    remove(id);
    setActionId(null);
  };

  const toggleReaction = (id: string, emoji: string) => {
    const m = messages.find((x) => x.id === id);
    if (!m) return;
    const list = m.reactions ? m.reactions.map((r) => ({ ...r })) : [];
    const idx = list.findIndex((r) => r.emoji === emoji);
    if (idx >= 0) {
      const next = list[idx].count + (list[idx].me ? -1 : 1);
      if (next <= 0) list.splice(idx, 1);
      else list[idx] = { emoji, count: next, me: !list[idx].me };
    } else {
      list.push({ emoji, count: 1, me: true });
    }
    update(id, { reactions: list });
    setActionId(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center border-b border-divider px-2 py-2">
        <Pressable onPress={() => router.back()} accessibilityLabel="Back" hitSlop={8} className="p-1">
          <ChevronLeft size={26} color={tokens.colors.header} />
        </Pressable>
        {header.variant === 'channel' ? (
          <Hash size={20} color={tokens.colors.muted} />
        ) : (
          <Avatar name={header.title} tint={header.tint ?? tokens.colors.blurple} size={26} status={header.status} />
        )}
        <View className="ml-1.5 flex-1">
          <Text className="text-[16px] font-bold text-header" numberOfLines={1}>
            {header.title}
          </Text>
          {header.subtitle ? <Text className="text-[11px] text-muted">{header.subtitle}</Text> : null}
        </View>
        <View className="flex-row items-center gap-4 pr-1">
          <Phone size={20} color={tokens.colors.interactive} />
          <Video size={22} color={tokens.colors.interactive} />
          {header.variant === 'channel' ? <Users size={20} color={tokens.colors.interactive} /> : null}
          <Search size={20} color={tokens.colors.interactive} />
        </View>
      </View>

      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          ref={scrollRef}
          className="flex-1"
          contentContainerStyle={{ paddingVertical: 12 }}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
        >
          {messages.map((m, i) => (
            <MessageRow
              key={m.id}
              message={m}
              grouped={i > 0 && messages[i - 1].authorId === m.authorId}
              editing={editingId === m.id}
              onLongPress={() => setActionId(m.id)}
              onCommitEdit={(text) => commitEdit(m.id, text)}
              onToggleReaction={(emoji) => toggleReaction(m.id, emoji)}
            />
          ))}
        </ScrollView>

        {/* Composer */}
        <View className="flex-row items-center gap-2 px-3 pb-2 pt-1">
          <View className="flex-1 flex-row items-center rounded-2xl bg-composer px-3">
            <Pressable accessibilityLabel="Add attachment" hitSlop={6}>
              <PlusCircle size={22} color={tokens.colors.interactive} />
            </Pressable>
            <TextInput
              value={draft}
              onChangeText={setDraft}
              placeholder={header.variant === 'channel' ? `Message #${header.title}` : `Message @${header.title}`}
              placeholderTextColor={tokens.colors.muted}
              accessibilityLabel="Message input"
              onSubmitEditing={send}
              returnKeyType="send"
              className="mx-2 h-11 flex-1 text-[15px] text-foreground"
            />
            <Pressable accessibilityLabel="Emoji" hitSlop={6}>
              <Smile size={22} color={tokens.colors.interactive} />
            </Pressable>
          </View>
          {draft.trim().length > 0 ? (
            <Pressable
              onPress={send}
              accessibilityLabel="Send message"
              className="h-10 w-10 items-center justify-center rounded-full bg-blurple"
            >
              <Send size={18} color="#ffffff" />
            </Pressable>
          ) : null}
        </View>
      </KeyboardAvoidingView>

      {/* Long-press actions sheet: react / edit (mine) / delete (mine) */}
      {actionMsg ? (
        <View className="absolute inset-0 justify-end bg-black/40">
          <Pressable className="flex-1" onPress={() => setActionId(null)} accessibilityLabel="Dismiss actions" />
          <View className="rounded-t-2xl bg-elevated px-3 pb-8 pt-3">
            {/* Quick reactions row */}
            <View className="mb-2 flex-row justify-between rounded-xl bg-[#2B2D31] px-2 py-2">
              {EMOJIS.slice(0, 6).map((e) => (
                <Pressable
                  key={e}
                  onPress={() => toggleReaction(actionMsg.id, e)}
                  accessibilityLabel={`Add reaction ${e}`}
                  className="h-10 w-10 items-center justify-center"
                >
                  <Text className="text-[22px]">{e}</Text>
                </Pressable>
              ))}
            </View>
            {actionMsg.authorId === ME.id ? (
              <>
                <Pressable
                  onPress={() => {
                    setEditingId(actionMsg.id);
                    setActionId(null);
                  }}
                  accessibilityLabel="Edit message"
                  className="flex-row items-center gap-3 rounded-lg px-3 py-3"
                >
                  <Pencil size={19} color={tokens.colors.interactive} />
                  <Text className="text-[15px] text-foreground">Edit Message</Text>
                </Pressable>
                <Pressable
                  onPress={() => del(actionMsg.id)}
                  accessibilityLabel="Delete message"
                  className="flex-row items-center gap-3 rounded-lg px-3 py-3"
                >
                  <Trash2 size={19} color={tokens.colors.dnd} />
                  <Text className="text-[15px] text-dnd">Delete Message</Text>
                </Pressable>
              </>
            ) : (
              <View className="flex-row items-center gap-3 px-3 py-3">
                <X size={19} color={tokens.colors.muted} />
                <Text className="text-[13px] text-muted">Long-press your own message to edit or delete it.</Text>
              </View>
            )}
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
}
