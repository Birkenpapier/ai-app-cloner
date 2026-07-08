import { router, useLocalSearchParams } from 'expo-router';
import {
  Brush,
  Circle,
  Image as ImageIcon,
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
  Trash2,
  Undo2,
  User,
  X,
} from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
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

// A node's own text is an editable field, not a caption: tap a selected node to
// swap the label for this input, which commits on blur/submit and persists.
// The `central` variant edits the root idea (bold, centered, no pill chrome).
function NodeEditor({
  node,
  onSubmit,
  variant = 'pill',
}: {
  node: MapNode;
  onSubmit: (text: string) => void;
  variant?: 'pill' | 'central';
}) {
  const [value, setValue] = useState(node.text);
  const color = tokens.nodeColors[node.color];
  const Icon = node.icon ? ICON_BY_KEY[node.icon] : null;
  if (variant === 'central') {
    return (
      <TextInput
        autoFocus
        value={value}
        onChangeText={setValue}
        onSubmitEditing={() => onSubmit(value)}
        onBlur={() => onSubmit(value)}
        accessibilityLabel="Central idea input"
        returnKeyType="done"
        selectTextOnFocus
        className="text-center text-[17px] font-bold text-foreground"
        style={{ minWidth: 180 }}
      />
    );
  }
  return (
    <View
      className="flex-row items-center gap-1.5 self-start rounded-node border bg-surface px-3 py-2"
      style={{ borderColor: color, borderWidth: 2.5 }}
    >
      {Icon ? <Icon size={14} color={color} /> : null}
      <TextInput
        autoFocus
        value={value}
        onChangeText={setValue}
        onSubmitEditing={() => onSubmit(value)}
        onBlur={() => onSubmit(value)}
        accessibilityLabel="Node text input"
        returnKeyType="done"
        selectTextOnFocus
        className="p-0 text-[13px] font-medium text-foreground"
        style={{ minWidth: 130 }}
      />
    </View>
  );
}

function NodePill({
  node,
  selected,
  onPress,
  onEdit,
  onLongPress,
}: {
  node: MapNode;
  selected: boolean;
  onPress: () => void;
  onEdit: () => void;
  onLongPress: () => void;
}) {
  const color = tokens.nodeColors[node.color];
  const Icon = node.icon ? ICON_BY_KEY[node.icon] : null;
  return (
    <Pressable
      // Tap once to select, tap the selected node again to rename it in place.
      onPress={selected ? onEdit : onPress}
      onLongPress={onLongPress}
      delayLongPress={400}
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
  const { items: maps, update: updateMap } = useMaps();
  const { items: nodes, add, update, remove } = useNodes(mapId);
  const [selected, setSelected] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [iconQuery, setIconQuery] = useState('');
  // A tiny inverse-op history so Undo actually undoes the last change.
  const [undoStack, setUndoStack] = useState<(() => void)[]>([]);

  const map = maps.find((m) => m.id === mapId);
  const root = nodes.find((n) => n.depth === 0);
  const branches = nodes.filter((n) => n.depth > 0);
  const centralTitle = root?.text ?? map?.title ?? 'Untitled Map';

  const pushUndo = (undo: () => void) => setUndoStack((s) => [...s, undo]);
  const undoLast = () => {
    const fn = undoStack[undoStack.length - 1];
    if (!fn) return;
    fn();
    setUndoStack((s) => s.slice(0, -1));
  };

  const addNode = () => {
    const color = NEXT_COLOR[branches.length % NEXT_COLOR.length];
    const node: MapNode = { id: makeId(), text: 'New idea', color, depth: 1, kind: 'branch' };
    add(node);
    setSelected(node.id);
    pushUndo(() => remove(node.id));
  };

  const commitEdit = (nodeId: string, text: string) => {
    setEditingId(null);
    const current = nodes.find((n) => n.id === nodeId);
    const next = text.trim();
    if (!current || next === '' || next === current.text) return;
    const prev = current.text;
    update(nodeId, { text: next });
    pushUndo(() => update(nodeId, { text: prev }));
  };

  const deleteNode = (nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;
    remove(nodeId);
    if (selected === nodeId) setSelected(null);
    setPickerOpen(false);
    pushUndo(() => add(node));
  };

  const applyIcon = (iconKey: string) => {
    const target = selected ?? branches[0]?.id ?? root?.id;
    if (target) {
      const prev = nodes.find((n) => n.id === target)?.icon;
      update(target, { icon: iconKey });
      pushUndo(() => update(target, { icon: prev }));
    }
    setPickerOpen(false);
  };

  const cycleColor = () => {
    const target = selected ?? root?.id;
    const current = target ? nodes.find((n) => n.id === target) : undefined;
    if (!target || !current) return;
    const next = NEXT_COLOR[(NEXT_COLOR.indexOf(current.color) + 1) % NEXT_COLOR.length];
    update(target, { color: next });
    pushUndo(() => update(target, { color: current.color }));
  };

  const toggleShare = () => {
    if (map) updateMap(mapId, { shared: !map.shared });
  };

  const openActions = (nodeId: string) => {
    setSelected(nodeId);
    setPickerOpen(true);
  };

  const visibleIcons = PICKER_ICONS.filter((p) => p.key.includes(iconQuery.trim().toLowerCase()));

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={['top']}>
      {/* Top bar */}
      <View className="flex-row items-center justify-between px-3 py-2.5">
        <Pressable onPress={() => router.back()} accessibilityLabel="Back to maps" hitSlop={8}>
          <Text className="text-[24px] text-foreground">‹</Text>
        </Pressable>
        <View className="flex-row items-center gap-4">
          <Pressable
            onPress={undoLast}
            disabled={undoStack.length === 0}
            accessibilityLabel="Undo"
            hitSlop={8}
            style={{ opacity: undoStack.length === 0 ? 0.35 : 1 }}
          >
            <Undo2 size={20} color={tokens.colors.secondary} />
          </Pressable>
          <Pressable onPress={() => router.push(`/comments/${mapId}`)} accessibilityLabel="Open comments" hitSlop={8}>
            <MessageCircle size={20} color={tokens.colors.secondary} />
          </Pressable>
          <Pressable
            onPress={toggleShare}
            accessibilityLabel={map?.shared ? 'Shared' : 'Share'}
            className="flex-row items-center gap-1 rounded-full px-3.5 py-1.5"
            style={{ backgroundColor: map?.shared ? tokens.nodeColors.green : tokens.nodeColors.blue }}
          >
            <Share2 size={13} color="#ffffff" />
            <Text className="text-[13px] font-semibold text-white">{map?.shared ? 'Shared' : 'Share'}</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingTop: 12, paddingBottom: 120 }}>
        {/* Central idea — tap to rename */}
        <View className="mb-5 items-center">
          <View className="mb-2 h-12 w-12 items-center justify-center rounded-full bg-yellow/20">
            <Lightbulb size={26} color={tokens.colors.yellow} fill={tokens.colors.yellow} />
          </View>
          {root && editingId === root.id ? (
            <NodeEditor node={root} variant="central" onSubmit={(text) => commitEdit(root.id, text)} />
          ) : (
            <Pressable
              onPress={() => root && setEditingId(root.id)}
              accessibilityLabel={`Central idea ${centralTitle}`}
            >
              <Text className="text-center text-[17px] font-bold text-foreground">{centralTitle}</Text>
            </Pressable>
          )}
        </View>

        {/* Outline tree */}
        {branches.length === 0 ? (
          <Text className="mt-6 text-center text-[13px] text-secondary">Tap + to add your first branch.</Text>
        ) : (
          <View className="border-l-2 border-border pl-1">
            {branches.map((n) => (
              <Swipeable
                key={n.id}
                overshootRight={false}
                renderRightActions={() => (
                  <Pressable
                    onPress={() => deleteNode(n.id)}
                    accessibilityLabel={`Swipe delete ${n.text}`}
                    className="mb-3 ml-2 items-center justify-center rounded-node bg-node-red px-5"
                  >
                    <Trash2 size={18} color="#ffffff" />
                  </Pressable>
                )}
              >
                <View className="mb-3 flex-row items-center bg-canvas" style={{ paddingLeft: (n.depth - 1) * 22 }}>
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
                  {editingId === n.id ? (
                    <NodeEditor node={n} onSubmit={(text) => commitEdit(n.id, text)} />
                  ) : (
                    <NodePill
                      node={n}
                      selected={selected === n.id}
                      onPress={() => setSelected(n.id)}
                      onEdit={() => setEditingId(n.id)}
                      onLongPress={() => openActions(n.id)}
                    />
                  )}
                </View>
              </Swipeable>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Bottom toolbar */}
      <View className="absolute bottom-7 left-0 right-0 flex-row items-center justify-center gap-3 px-5">
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
          <Pressable onPress={() => setPickerOpen(true)} accessibilityLabel="Add icon" hitSlop={8}>
            <SmilePlus size={20} color={tokens.colors.foreground} />
          </Pressable>
          <Pressable onPress={() => setPickerOpen(true)} accessibilityLabel="More" hitSlop={8}>
            <MoreHorizontal size={20} color={tokens.colors.foreground} />
          </Pressable>
        </View>
        <Pressable
          onPress={toggleShare}
          accessibilityLabel="Share map"
          className="h-11 w-11 items-center justify-center rounded-full"
          style={{ backgroundColor: map?.shared ? tokens.nodeColors.green : tokens.nodeColors.blue }}
        >
          <Share2 size={18} color="#ffffff" />
        </Pressable>
      </View>

      {/* Icon / actions bottom sheet (a state of the editor) */}
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
              <TextInput
                value={iconQuery}
                onChangeText={setIconQuery}
                placeholder="Search"
                placeholderTextColor={tokens.colors.tertiary}
                accessibilityLabel="Search icons"
                className="p-0 text-[14px] text-foreground"
              />
            </View>
            <Text className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-secondary">Creativity</Text>
            <View className="flex-row flex-wrap gap-3">
              {visibleIcons.map(({ key, Icon }) => (
                <Pressable
                  key={key}
                  onPress={() => applyIcon(key)}
                  accessibilityLabel={`Icon ${key}`}
                  className="h-14 w-14 items-center justify-center rounded-xl bg-surface2"
                >
                  <Icon size={22} color={tokens.colors.foreground} />
                </Pressable>
              ))}
              {visibleIcons.length === 0 ? (
                <Text className="py-4 text-[13px] text-secondary">No icons match “{iconQuery}”.</Text>
              ) : null}
            </View>
            <View className="mt-5 flex-row items-center justify-between border-t border-border pt-3">
              <Pressable onPress={cycleColor} accessibilityLabel="Cycle color" className="flex-row items-center gap-1.5">
                <ImageIcon size={18} color={tokens.colors.primary} />
                <Text className="text-[13px] font-medium text-foreground">Color</Text>
              </Pressable>
              <Pressable
                onPress={() => selected && deleteNode(selected)}
                disabled={!selected}
                accessibilityLabel="Remove node"
                style={{ opacity: selected ? 1 : 0.35 }}
              >
                <Text className="text-[13px] font-medium text-node-red">Remove</Text>
              </Pressable>
            </View>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
}
