import { router, useLocalSearchParams } from 'expo-router';
import {
  Brush,
  Circle,
  Image as ImageIcon,
  Info,
  Layers,
  Lightbulb,
  MessageCircle,
  MessageSquare,
  Minus,
  MoreHorizontal,
  Pencil,
  PenTool,
  Plus,
  Share2,
  SmilePlus,
  Square,
  Star,
  Undo2,
  User,
  X,
} from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { type MapNode, useMaps, useNodes } from '@/lib/data';
import { makeId } from '@/lib/store';
import { tokens, type NodeColor } from '@/lib/tokens';

const PICKER_ICONS: { key: string; Icon: typeof Circle }[] = [
  { key: 'circle', Icon: Circle },
  { key: 'pencil', Icon: Pencil },
  { key: 'lightbulb', Icon: Lightbulb },
  { key: 'layers', Icon: Layers },
  { key: 'line', Icon: Minus },
  { key: 'brush', Icon: Brush },
  { key: 'pen', Icon: PenTool },
  { key: 'star', Icon: Star },
  { key: 'message-square', Icon: MessageSquare },
  { key: 'square', Icon: Square },
];
const ICON_BY_KEY = Object.fromEntries(PICKER_ICONS.map((p) => [p.key, p.Icon]));
const NEXT_COLOR: NodeColor[] = ['blue', 'purple', 'red', 'orange', 'teal', 'green'];

function NodePill({
  node,
  selected,
  onPress,
}: {
  node: MapNode;
  selected: boolean;
  onPress: () => void;
}) {
  const color = tokens.nodeColors[node.color];
  const Icon = node.icon ? ICON_BY_KEY[node.icon] : null;
  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel={`Node ${node.text}`}
      className="flex-row items-center gap-1.5 self-start rounded-node border bg-surface px-3 py-2"
      style={{ borderColor: color, borderWidth: selected ? 2.5 : 1.5 }}
    >
      {node.kind === 'person' ? (
        <View className="h-4 w-4 items-center justify-center rounded-full" style={{ backgroundColor: color }}>
          <User size={10} color="#ffffff" />
        </View>
      ) : null}
      {Icon ? <Icon size={14} color={color} /> : null}
      <Text className="text-[13px] font-medium text-foreground">{node.text}</Text>
    </Pressable>
  );
}

export default function MapEditor() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const mapId = id ?? 'campaign';
  const { items: maps } = useMaps();
  const { items: nodes, add, update } = useNodes(mapId);
  const [selected, setSelected] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);

  const map = maps.find((m) => m.id === mapId);
  const root = nodes.find((n) => n.depth === 0);
  const branches = nodes.filter((n) => n.depth > 0);
  const centralTitle = root?.text ?? map?.title ?? 'Untitled Map';

  const addNode = () => {
    const color = NEXT_COLOR[branches.length % NEXT_COLOR.length];
    add({ id: makeId(), text: 'New idea', color, depth: 1, kind: 'branch' });
  };
  const applyIcon = (iconKey: string) => {
    const target = selected ?? branches[0]?.id ?? root?.id;
    if (target) update(target, { icon: iconKey });
    setPickerOpen(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={['top']}>
      {/* Top bar */}
      <View className="flex-row items-center justify-between px-3 py-2.5">
        <Pressable onPress={() => router.back()} accessibilityLabel="Back to maps" hitSlop={8}>
          <Text className="text-[24px] text-foreground">‹</Text>
        </Pressable>
        <View className="flex-row items-center gap-4">
          <Undo2 size={20} color={tokens.colors.secondary} />
          <Info size={20} color={tokens.colors.secondary} />
          <Pressable onPress={() => router.push(`/comments/${mapId}`)} accessibilityLabel="Open comments" hitSlop={8}>
            <MessageCircle size={20} color={tokens.colors.secondary} />
          </Pressable>
          <Pressable
            accessibilityLabel="Share"
            className="flex-row items-center gap-1 rounded-full bg-node-blue px-3.5 py-1.5"
          >
            <Share2 size={13} color="#ffffff" />
            <Text className="text-[13px] font-semibold text-white">Share</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingTop: 12, paddingBottom: 120 }}>
        {/* Central idea */}
        <View className="mb-5 items-center">
          <View className="mb-2 h-12 w-12 items-center justify-center rounded-full bg-yellow/20">
            <Lightbulb size={26} color={tokens.colors.yellow} fill={tokens.colors.yellow} />
          </View>
          <Text className="text-center text-[17px] font-bold text-foreground">{centralTitle}</Text>
        </View>

        {/* Outline tree */}
        {branches.length === 0 ? (
          <Text className="mt-6 text-center text-[13px] text-secondary">Tap + to add your first branch.</Text>
        ) : (
          <View className="border-l-2 border-border pl-1">
            {branches.map((n) => (
              <View key={n.id} className="mb-3 flex-row items-center" style={{ paddingLeft: (n.depth - 1) * 22 }}>
                {/* connector + bullet */}
                <View
                  className="mr-2 h-[2px] w-4"
                  style={{ backgroundColor: tokens.nodeColors[n.color], opacity: 0.5 }}
                />
                {n.kind === 'numbered' ? (
                  <View
                    className="mr-2 h-5 w-5 items-center justify-center rounded-full"
                    style={{ borderWidth: 1.5, borderColor: tokens.nodeColors[n.color] }}
                  >
                    <Text className="text-[11px] font-bold" style={{ color: tokens.nodeColors[n.color] }}>
                      {branches.filter((b) => b.kind === 'numbered').indexOf(n) + 1}
                    </Text>
                  </View>
                ) : null}
                <NodePill node={n} selected={selected === n.id} onPress={() => setSelected(n.id)} />
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Bottom toolbar */}
      <View className="absolute bottom-7 left-0 right-0 flex-row items-center justify-center gap-3 px-5">
        <View className="h-11 w-11 items-center justify-center rounded-full border border-border bg-surface">
          <Circle size={18} color={tokens.colors.secondary} />
        </View>
        <View
          className="flex-row items-center gap-5 rounded-full bg-surface px-5 py-3"
          style={{
            shadowColor: '#1C1E2E',
            shadowOpacity: 0.12,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 4 },
            elevation: 6,
          }}
        >
          <Pressable onPress={addNode} accessibilityLabel="Add node" hitSlop={8}>
            <Plus size={22} color={tokens.colors.foreground} />
          </Pressable>
          <Pressable onPress={() => setPickerOpen(true)} accessibilityLabel="Style node" hitSlop={8}>
            <Brush size={20} color={tokens.colors.foreground} />
          </Pressable>
          <SmilePlus size={20} color={tokens.colors.foreground} />
          <MoreHorizontal size={20} color={tokens.colors.foreground} />
        </View>
        <View className="h-11 w-11 items-center justify-center rounded-full bg-node-blue">
          <Share2 size={18} color="#ffffff" />
        </View>
      </View>

      {/* Icon picker bottom sheet (a state of the editor) */}
      {pickerOpen ? (
        <View className="absolute inset-0 justify-end bg-black/20">
          <Pressable className="flex-1" onPress={() => setPickerOpen(false)} accessibilityLabel="Dismiss picker" />
          <View className="rounded-t-3xl bg-surface px-4 pb-8 pt-4">
            <View className="mb-3 flex-row items-center justify-between">
              <Text className="text-[16px] font-semibold text-foreground">Icons</Text>
              <Pressable onPress={() => setPickerOpen(false)} accessibilityLabel="Close picker" hitSlop={8}>
                <X size={22} color={tokens.colors.foreground} />
              </Pressable>
            </View>
            <View className="mb-4 rounded-full bg-surface2 px-4 py-2.5">
              <Text className="text-[14px] text-tertiary">Search</Text>
            </View>
            <Text className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-secondary">Creativity</Text>
            <View className="flex-row flex-wrap gap-3">
              {PICKER_ICONS.map(({ key, Icon }) => (
                <Pressable
                  key={key}
                  onPress={() => applyIcon(key)}
                  accessibilityLabel={`Icon ${key}`}
                  className="h-14 w-14 items-center justify-center rounded-xl bg-surface2"
                >
                  <Icon size={22} color={tokens.colors.foreground} />
                </Pressable>
              ))}
            </View>
            <View className="mt-5 flex-row items-center justify-between border-t border-border pt-3">
              <View className="flex-row items-center gap-1.5">
                <ImageIcon size={18} color={tokens.colors.primary} />
                <Text className="text-[13px] font-medium text-foreground">Color</Text>
              </View>
              <Text className="text-[13px] font-medium text-node-red">Remove</Text>
              <Text className="text-[13px] font-medium text-foreground">Position</Text>
            </View>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
}
