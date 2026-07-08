import { router, useLocalSearchParams } from 'expo-router';
import { ChevronDown, Hash, Plus, Volume2 } from 'lucide-react-native';
import { Fragment } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ServerRail } from '@/components/ServerRail';
import { channelsForServer, serverById } from '@/lib/data';
import { tokens } from '@/lib/tokens';

export default function Server() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const serverId = id ?? 'hangout';
  const server = serverById(serverId);
  const channels = channelsForServer(serverId);
  const categories = [...new Set(channels.map((c) => c.category))];

  return (
    <SafeAreaView className="flex-1 flex-row bg-sidebar" edges={['top']}>
      <ServerRail active={serverId} />

      <View className="flex-1 bg-sidebar">
        {/* Server header */}
        <Pressable className="flex-row items-center justify-between border-b border-divider px-4 py-3.5">
          <Text className="text-[16px] font-bold text-header" numberOfLines={1}>
            {server.name}
          </Text>
          <ChevronDown size={20} color={tokens.colors.interactive} />
        </Pressable>

        <ScrollView className="flex-1 px-2 pt-3" contentContainerStyle={{ paddingBottom: 24 }}>
          {channels.length === 0 ? (
            <Text className="mt-8 text-center text-[13px] text-muted">No channels here yet.</Text>
          ) : (
            categories.map((cat) => (
              <Fragment key={cat}>
                <View className="mb-1 mt-3 flex-row items-center gap-1 px-2">
                  <ChevronDown size={12} color={tokens.colors.muted} />
                  <Text className="text-[12px] font-bold uppercase tracking-wide text-muted">{cat}</Text>
                  <View className="flex-1" />
                  <Plus size={16} color={tokens.colors.muted} />
                </View>
                {channels
                  .filter((c) => c.category === cat)
                  .map((c) =>
                    c.kind === 'text' ? (
                      <Pressable
                        key={c.id}
                        onPress={() => router.push(`/channel/${c.id}`)}
                        accessibilityLabel={`Open #${c.name}`}
                        className="flex-row items-center gap-2 rounded-md px-2 py-2"
                      >
                        <Hash size={19} color={tokens.colors.muted} />
                        <Text className="text-[15px] text-muted">{c.name}</Text>
                      </Pressable>
                    ) : (
                      // Voice channels join a live call — realtime/voice is backend,
                      // mocked here, so these are display-only (stated in the report).
                      <View key={c.id} className="flex-row items-center gap-2 rounded-md px-2 py-2">
                        <Volume2 size={19} color={tokens.colors.muted} />
                        <Text className="text-[15px] text-muted">{c.name}</Text>
                      </View>
                    ),
                  )}
              </Fragment>
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
