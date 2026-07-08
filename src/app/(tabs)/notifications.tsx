import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '@/components/Avatar';
import { NOTICES, person } from '@/lib/data';
import { tokens } from '@/lib/tokens';

export default function Notifications() {
  return (
    <SafeAreaView className="flex-1 bg-sidebar" edges={['top']}>
      <View className="px-4 pb-2 pt-2">
        <Text className="text-[20px] font-extrabold text-header">Notifications</Text>
        <View className="mt-3 flex-row gap-5 border-b border-divider">
          <Text className="border-b-2 border-white pb-2 text-[14px] font-semibold text-header">For You</Text>
          <Text className="pb-2 text-[14px] text-muted">Mentions</Text>
        </View>
      </View>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingVertical: 6 }}>
        {NOTICES.map((n) => {
          const actor = person(n.actorId);
          return (
            <View key={n.id} className="flex-row gap-3 px-4 py-3">
              <Avatar name={actor.name} tint={actor.tint} size={40} />
              <View className="flex-1">
                <Text className="text-[14px] text-foreground">
                  <Text className="font-semibold text-header">{actor.name}</Text> {n.text}
                </Text>
                <Text className="mt-0.5 text-[12px] text-muted">
                  {n.where} · {n.time}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
