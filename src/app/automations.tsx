import { router } from 'expo-router';
import {
  Calendar,
  Check,
  CheckCircle2,
  ChevronLeft,
  ListChecks,
  Mail,
  Move,
  Tag,
  Timer,
  UserPlus,
  type LucideIcon,
} from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AUTOMATIONS } from '@/lib/data';
import { makeId, useCollection } from '@/lib/store';

const ICONS: Record<string, LucideIcon> = {
  'user-plus': UserPlus,
  'check-circle': CheckCircle2,
  move: Move,
  mail: Mail,
  calendar: Calendar,
  tag: Tag,
  timer: Timer,
  'list-checks': ListChecks,
};

type ActiveAutomation = { id: string; automationId: string };

export default function Automations() {
  const { items: active, add, remove } = useCollection<ActiveAutomation>('mt.automations.v1', []);

  const isActive = (automationId: string) => active.find((a) => a.automationId === automationId);
  const toggle = (automationId: string) => {
    const existing = isActive(automationId);
    if (existing) remove(existing.id);
    else add({ id: makeId(), automationId });
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="flex-row items-center border-b border-border bg-surface px-2 py-3">
        <Pressable
          onPress={() => router.back()}
          accessibilityLabel="Back"
          hitSlop={8}
          className="flex-row items-center"
        >
          <ChevronLeft size={24} color="#0087F2" />
          <Text className="text-[16px] text-primary">Back</Text>
        </Pressable>
        <Text className="absolute left-0 right-0 text-center text-[16px] font-semibold text-foreground">
          Add Automation
        </Text>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingVertical: 8 }}>
        <View className="mx-4 mt-2 overflow-hidden rounded-card bg-surface">
          {AUTOMATIONS.map((a, i) => {
            const Icon = ICONS[a.icon] ?? Move;
            const on = isActive(a.id);
            return (
              <Pressable
                key={a.id}
                onPress={() => toggle(a.id)}
                accessibilityLabel={a.title}
                className="flex-row items-center gap-3 px-4 py-3.5"
                style={{ borderTopWidth: i === 0 ? 0 : 1, borderTopColor: '#EFF0F4' }}
              >
                <View
                  className="h-8 w-8 items-center justify-center rounded-lg"
                  style={{ backgroundColor: a.tint + '1A' }}
                >
                  <Icon size={18} color={a.tint} />
                </View>
                <Text className="flex-1 text-[15px] text-foreground">{a.title}</Text>
                {on ? (
                  <View
                    accessibilityLabel={`${a.title} enabled`}
                    className="h-5 w-5 items-center justify-center rounded-full bg-primary"
                  >
                    <Check size={13} color="#ffffff" />
                  </View>
                ) : (
                  <View className="h-5 w-5 rounded-full border border-border" />
                )}
              </Pressable>
            );
          })}
        </View>
        <Text className="mx-6 mt-3 text-[12px] leading-[17px] text-tertiary">
          Automations run whenever a task enters this section. Tap to add one to the Marketing Requests workflow.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
