import { router } from 'expo-router';
import { MessagesSquare, Plus } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { SERVERS } from '@/lib/data';
import { tokens } from '@/lib/tokens';

// The far-left server rail. `active` is 'dm' on the Messages tab, or a server id.
// The white pill on the left marks the active item; a short pill marks unread.
function RailItem({
  active,
  unread,
  label,
  onPress,
  children,
}: {
  active?: boolean;
  unread?: boolean;
  label: string;
  onPress: () => void;
  children: React.ReactNode;
}) {
  return (
    <View className="w-full flex-row items-center">
      <View className="h-12 items-start justify-center" style={{ width: 8 }}>
        {active ? (
          <View className="h-10 w-1 rounded-r-full bg-white" />
        ) : unread ? (
          <View className="h-2 w-1 rounded-r-full bg-white" />
        ) : null}
      </View>
      <Pressable onPress={onPress} accessibilityLabel={label} className="ml-1.5">
        {children}
      </Pressable>
    </View>
  );
}

export function ServerRail({ active }: { active: string }) {
  return (
    <View className="w-[72px] items-center bg-rail pb-4 pt-3" style={{ rowGap: 8 }}>
      <RailItem active={active === 'dm'} label="Direct messages" onPress={() => router.replace('/messages')}>
        <View
          className="h-12 w-12 items-center justify-center"
          style={{ backgroundColor: tokens.colors.blurple, borderRadius: active === 'dm' ? 16 : 24 }}
        >
          <MessagesSquare size={26} color="#ffffff" />
        </View>
      </RailItem>

      <View className="h-0.5 w-8 rounded-full bg-divider" />

      {SERVERS.map((s) => (
        <RailItem
          key={s.id}
          active={active === s.id}
          unread={s.unread}
          label={`Open ${s.name}`}
          onPress={() => router.push(`/server/${s.id}`)}
        >
          <View
            className="h-12 w-12 items-center justify-center"
            style={{ backgroundColor: s.tint, borderRadius: active === s.id ? 16 : 24 }}
          >
            <Text className="text-[15px] font-semibold text-white">{s.short}</Text>
          </View>
        </RailItem>
      ))}

      <RailItem label="Add a server" onPress={() => router.push('/server/hangout')}>
        <View className="h-12 w-12 items-center justify-center rounded-3xl bg-[#232428]">
          <Plus size={24} color={tokens.colors.online} />
        </View>
      </RailItem>
    </View>
  );
}
