import { router } from 'expo-router';
import { Plus, Power, Search } from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { Avatar } from '@/components/Avatar';
import { GradientHeader } from '@/components/GradientHeader';
import {
  ME,
  MOTIVATION,
  MOTIVATION_AUTHOR,
  type NotificationItem,
  person,
  useNotifications,
  useTasks,
} from '@/lib/data';

function NotifCard({
  n,
  onPress,
}: {
  n: NotificationItem;
  onPress: () => void;
}) {
  const actor = person(n.actorId);
  return (
    <Pressable
      onPress={onPress}
      accessibilityLabel={`Notification from ${actor.name}`}
      className="mb-3 rounded-card bg-surface p-3.5"
      style={{
        shadowColor: '#1C1E2E',
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
        opacity: n.read ? 0.6 : 1,
      }}
    >
      <View className="flex-row items-center gap-2.5">
        <View className="relative">
          <Avatar id={n.actorId} size={34} />
          <View className="absolute -bottom-1 -right-1 h-4 w-4 items-center justify-center rounded-full bg-purple">
            <Text className="text-[9px] font-bold text-white">@</Text>
          </View>
        </View>
        <View className="flex-1">
          <Text className="text-[11px] font-semibold uppercase tracking-wide text-tertiary">{n.time}</Text>
          <Text className="text-[13px] leading-[18px] text-foreground">
            <Text className="font-semibold">{actor.name.split(' ')[0]} </Text>
            {n.action}{' '}
            <Text className="font-semibold text-primary">{n.target}</Text>
          </Text>
        </View>
      </View>
      <View className="mt-2.5 rounded-lg bg-surface2 p-2.5">
        <Text className="text-[13px] leading-[18px] text-secondary" numberOfLines={4}>
          {n.excerpt}
        </Text>
      </View>
    </Pressable>
  );
}

export default function Notifications() {
  const { items: notifs, update } = useNotifications();
  const { items: tasks } = useTasks();

  const open = (n: NotificationItem) => {
    update(n.id, { read: true });
    const match = tasks.find((t) => t.title === n.target);
    if (match) router.push(`/task/${match.id}`);
  };

  return (
    <View className="flex-1 bg-background">
      <GradientHeader>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <Avatar id={ME.id} size={30} />
            <Search size={20} color="#ffffff" />
          </View>
          <View className="flex-row items-center gap-4">
            <Pressable onPress={() => router.replace('/')} accessibilityLabel="Log out" hitSlop={8}>
              <Power size={20} color="#ffffff" />
            </Pressable>
            <Plus size={22} color="#ffffff" />
          </View>
        </View>

        <Text className="mt-4 text-[24px] font-bold leading-[29px] text-white">Good Morning,{'\n'}Amanda!</Text>
        <Text className="mt-2 text-[13px] italic leading-[19px] text-white/80">“{MOTIVATION}”</Text>
        <Text className="mt-1 text-[12px] text-white/60">{MOTIVATION_AUTHOR}</Text>
      </GradientHeader>

      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingTop: 14, paddingBottom: 24 }}>
        <Text className="mb-3 text-[13px] font-semibold text-secondary">Today</Text>
        {notifs.map((n) => (
          <NotifCard key={n.id} n={n} onPress={() => open(n)} />
        ))}
      </ScrollView>
    </View>
  );
}
