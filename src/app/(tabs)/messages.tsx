import { router } from 'expo-router';
import { Search, UserPlus, Users } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '@/components/Avatar';
import { ServerRail } from '@/components/ServerRail';
import { DMS } from '@/lib/data';
import { tokens } from '@/lib/tokens';

export default function Messages() {
  const [query, setQuery] = useState('');
  const visible = DMS.filter((d) => d.name.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <SafeAreaView className="flex-1 flex-row bg-sidebar" edges={['top']}>
      <ServerRail active="dm" />

      <View className="flex-1 bg-sidebar">
        <View className="px-3 pt-2">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-[20px] font-extrabold text-header">Messages</Text>
            <Users size={22} color={tokens.colors.interactive} />
          </View>
          <View className="mb-2 flex-row items-center gap-2">
            <View className="flex-1 flex-row items-center rounded-lg bg-elevated px-3 py-2">
              <Search size={16} color={tokens.colors.muted} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search"
                placeholderTextColor={tokens.colors.muted}
                accessibilityLabel="Search DMs"
                className="ml-2 h-6 flex-1 p-0 text-[14px] text-foreground"
              />
            </View>
            <Pressable
              accessibilityLabel="Add friends"
              className="flex-row items-center gap-1.5 rounded-lg bg-elevated px-3 py-2.5"
            >
              <UserPlus size={16} color={tokens.colors.interactive} />
              <Text className="text-[13px] font-semibold text-foreground">Add Friends</Text>
            </Pressable>
          </View>
        </View>

        <ScrollView className="flex-1 px-2" contentContainerStyle={{ paddingBottom: 16 }}>
          {visible.map((dm) => (
            <Pressable
              key={dm.id}
              onPress={() => router.push(`/dm/${dm.id}`)}
              accessibilityLabel={`Open ${dm.name}`}
              className="flex-row items-center gap-3 rounded-lg px-2 py-2"
            >
              <Avatar
                name={dm.name}
                tint={dm.tint}
                size={44}
                status={dm.group ? undefined : dm.status}
                ringColor={tokens.colors.sidebar}
              />
              <View className="flex-1">
                <View className="flex-row items-center gap-1.5">
                  <Text className="text-[15px] font-semibold text-header" numberOfLines={1}>
                    {dm.name}
                  </Text>
                  {dm.group ? <Text className="text-[12px] text-muted">· {dm.members}</Text> : null}
                </View>
                <Text className="text-[13px] text-muted" numberOfLines={1}>
                  {dm.last}
                </Text>
              </View>
              <Text className="text-[11px] text-muted">{dm.time}</Text>
            </Pressable>
          ))}
          {visible.length === 0 ? (
            <Text className="mt-6 text-center text-[13px] text-muted">No conversations match “{query}”.</Text>
          ) : null}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
