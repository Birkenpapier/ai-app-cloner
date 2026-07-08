import { Text, View } from 'react-native';

import { tokens, type Status } from '@/lib/tokens';

const STATUS_COLOR: Record<Status, string> = {
  online: tokens.colors.online,
  idle: tokens.colors.idle,
  dnd: tokens.colors.dnd,
  offline: tokens.colors.muted,
};

// A raster screenshot doesn't carry the source avatars, so avatars are the
// member's initial on their color tint (an honest limitation, stated in the
// report), with Discord's bottom-right presence dot.
export function Avatar({
  name,
  tint,
  size = 40,
  status,
  ringColor = tokens.colors.sidebar,
}: {
  name: string;
  tint: string;
  size?: number;
  status?: Status;
  ringColor?: string;
}) {
  const initial = name.trim().charAt(0).toUpperCase();
  const dot = Math.round(size * 0.34);
  return (
    <View style={{ width: size, height: size }}>
      <View
        className="items-center justify-center rounded-full"
        style={{ width: size, height: size, backgroundColor: tint }}
      >
        <Text className="font-semibold text-white" style={{ fontSize: Math.round(size * 0.42) }}>
          {initial}
        </Text>
      </View>
      {status ? (
        <View
          className="absolute rounded-full"
          style={{
            width: dot,
            height: dot,
            right: -1,
            bottom: -1,
            backgroundColor: STATUS_COLOR[status],
            borderWidth: Math.max(2, Math.round(size * 0.06)),
            borderColor: ringColor,
          }}
        />
      ) : null}
    </View>
  );
}
