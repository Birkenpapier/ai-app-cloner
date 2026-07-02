import { router } from 'expo-router';
import { ChevronLeft, ListFilter } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { tokens } from '@/lib/tokens';

type Props = {
  title: string;
  /** Back button label (e.g. "Passwords"). Omit on the root screen. */
  backLabel?: string;
  /** Show the trailing select/list toggle (detail screens have it). */
  trailing?: boolean;
};

// iOS large-title navigation bar: a small top row (back button + trailing
// accessory) above a big bold title. Approximated for web parity.
export function LargeTitleHeader({ title, backLabel, trailing }: Props) {
  return (
    <View className="px-4 pt-1">
      <View className="h-11 flex-row items-center justify-between">
        {backLabel ? (
          <Pressable onPress={() => router.back()} className="-ml-1 flex-row items-center">
            <ChevronLeft size={28} color={tokens.colors.blue} strokeWidth={2.5} />
            <Text className="text-[17px] text-blue">{backLabel}</Text>
          </Pressable>
        ) : (
          <View />
        )}
        {trailing ? (
          <ListFilter size={22} color={tokens.colors.tertiary} strokeWidth={2} />
        ) : (
          <View />
        )}
      </View>
      <Text className="mt-0.5 text-[34px] font-bold leading-[41px] text-foreground">{title}</Text>
    </View>
  );
}
