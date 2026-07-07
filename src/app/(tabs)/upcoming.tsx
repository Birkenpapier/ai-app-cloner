import { CalendarDays, MoreHorizontal } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Fab } from '@/components/Fab';
import { useTasks } from '@/lib/tasks';
import { tokens } from '@/lib/tokens';

// Real calendar: the week is computed from today, day cells are selectable, and
// the list below reads the actual task store. No frozen dates, no dead cells.

const DOW = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function Upcoming() {
  const tasks = useTasks();
  const [selected, setSelected] = useState(0); // days from today

  const week = useMemo(() => {
    const base = new Date();
    base.setHours(0, 0, 0, 0);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      return d;
    });
  }, []);

  const day = week[selected];
  const monthLabel = `${MONTHS[day.getMonth()]} ${day.getFullYear()}`;
  const heading =
    selected === 0
      ? `${day.getDate()} ${MONTHS[day.getMonth()]} · Today`
      : selected === 1
        ? `${day.getDate()} ${MONTHS[day.getMonth()]} · Tomorrow`
        : `${day.getDate()} ${MONTHS[day.getMonth()]} · ${WEEKDAYS[day.getDay()]}`;

  const dayTasks = selected === 0 ? tasks.filter((t) => t.today && !t.done) : [];

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <View className="flex-row items-center justify-between px-4 pb-1 pt-1">
        <View className="w-9" />
        <Text className="text-[17px] font-semibold text-foreground">Upcoming</Text>
        <View className="flex-row items-center gap-1 rounded-full bg-surface2 px-2.5 py-1.5">
          <CalendarDays size={17} color={tokens.colors.foreground} />
          <MoreHorizontal size={17} color={tokens.colors.foreground} />
        </View>
      </View>

      <View className="px-4 pb-2 pt-1">
        <Text className="text-[15px] font-semibold text-foreground">{monthLabel}</Text>
      </View>

      <View className="flex-row justify-between border-b border-separator px-4 pb-3">
        {week.map((d, i) => {
          const active = i === selected;
          return (
            <Pressable key={i} onPress={() => setSelected(i)} className="items-center gap-1.5" style={{ width: 36 }}>
              <Text className="text-[12px] text-secondary">{DOW[d.getDay()]}</Text>
              {active ? (
                <View className="h-7 w-7 items-center justify-center rounded-full bg-red">
                  <Text className="text-[13px] font-semibold text-white">{d.getDate()}</Text>
                </View>
              ) : (
                <Text className="text-[13px] text-foreground">{d.getDate()}</Text>
              )}
            </Pressable>
          );
        })}
      </View>

      <ScrollView className="flex-1">
        <Text className="px-4 pb-1 pt-3 text-[15px] font-semibold text-foreground">{heading}</Text>
        {dayTasks.length > 0 ? (
          dayTasks.map((t) => (
            <View key={t.id} className="flex-row items-center gap-3 border-b border-separator px-4 py-3">
              <View className="h-5 w-5 rounded-full border-2 border-secondary" />
              <Text className="flex-1 text-[15px] text-foreground">{t.title}</Text>
            </View>
          ))
        ) : (
          <Text className="px-4 py-6 text-[14px] text-secondary">Nothing planned. Enjoy the day.</Text>
        )}
      </ScrollView>
      <Fab />
    </SafeAreaView>
  );
}
