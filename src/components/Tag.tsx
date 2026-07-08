import { Text, View } from 'react-native';

import type { TagKind } from '@/lib/data';

// MeisterTask tags are solid colored pills with white text. Colors matched by
// eye from the board screenshot; refined in the visual-diff loop.
const TAG_STYLE: Record<TagKind, { bg: string; fg: string }> = {
  help: { bg: '#2F3542', fg: '#FFFFFF' },
  open: { bg: '#22B14C', fg: '#FFFFFF' },
  podcast: { bg: '#0087F2', fg: '#FFFFFF' },
  social: { bg: '#8AA92E', fg: '#FFFFFF' },
  progress: { bg: '#12B5A6', fg: '#FFFFFF' },
  neutral: { bg: '#E7E8EE', fg: '#5A5D6B' },
};

export function Tag({ label, kind }: { label: string; kind: TagKind }) {
  const s = TAG_STYLE[kind];
  return (
    <View className="rounded-md px-2 py-[3px]" style={{ backgroundColor: s.bg }}>
      <Text className="text-[11px] font-semibold" style={{ color: s.fg }}>
        {label}
      </Text>
    </View>
  );
}
