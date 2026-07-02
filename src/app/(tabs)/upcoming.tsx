import { CalendarDays, ChevronRight, MoreHorizontal } from 'lucide-react-native';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Fab } from '@/components/Fab';
import { tokens } from '@/lib/tokens';

const WEEK = [
  { d: 'M', n: '29' },
  { d: 'T', n: '30' },
  { d: 'W', n: 'Jul\n1' },
  { d: 'T', n: '2', active: true },
  { d: 'F', n: '3' },
  { d: 'S', n: '4' },
  { d: 'S', n: '5' },
];

const DAYS = [
  '2 Jul · Today · Thursday',
  '3 Jul · Tomorrow · Friday',
  '4 Jul · Saturday',
  '5 Jul · Sunday',
  '6 Jul · Monday',
  '7 Jul · Tuesday',
  '8 Jul · Wednesday',
  '9 Jul · Thursday',
  '10 Jul · Friday',
  '11 Jul · Saturday',
];

export default function Upcoming() {
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

      <View className="flex-row items-center gap-1 px-4 pb-2 pt-1">
        <Text className="text-[15px] font-semibold text-foreground">Jul 2026</Text>
        <ChevronRight size={16} color={tokens.colors.secondary} />
      </View>

      <View className="flex-row justify-between border-b border-separator px-4 pb-3">
        {WEEK.map((w, i) => (
          <View key={i} className="items-center gap-1.5" style={{ width: 36 }}>
            <Text className="text-[12px] text-secondary">{w.d}</Text>
            {w.active ? (
              <View className="h-7 w-7 items-center justify-center rounded-full bg-red">
                <Text className="text-[13px] font-semibold text-white">{w.n}</Text>
              </View>
            ) : (
              <Text className="text-center text-[13px] leading-[15px] text-foreground">{w.n}</Text>
            )}
          </View>
        ))}
      </View>

      <ScrollView className="px-4">
        {DAYS.map((label) => (
          <Text key={label} className="border-b border-separator py-3.5 text-[15px] text-secondary">
            {label}
          </Text>
        ))}
      </ScrollView>
      <Fab />
    </SafeAreaView>
  );
}
