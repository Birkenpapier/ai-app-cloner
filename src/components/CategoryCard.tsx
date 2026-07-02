import { type Href, router } from 'expo-router';
import { ChevronRight, type LucideIcon } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { tokens } from '@/lib/tokens';

type Props = {
  icon: LucideIcon;
  /** Circle background color for the icon. */
  color: string;
  label: string;
  count: number;
  href: Href;
};

// A single category tile on the Passwords home grid: white rounded card with a
// colored icon chip (top-left), the count + chevron (top-right), and the label
// (bottom-left).
export function CategoryCard({ icon: Icon, color, label, count, href }: Props) {
  return (
    <Pressable
      onPress={() => router.push(href)}
      className="flex-1 justify-between rounded-card bg-surface p-3.5"
      style={{ minHeight: 120 }}
    >
      <View className="flex-row items-start justify-between">
        <View
          className="h-8 w-8 items-center justify-center rounded-full"
          style={{ backgroundColor: color }}
        >
          <Icon size={18} color="#ffffff" strokeWidth={2.5} />
        </View>
        <View className="flex-row items-center">
          <Text className="text-[17px] text-secondary">{count}</Text>
          <ChevronRight size={18} color={tokens.colors.tertiary} strokeWidth={2.5} />
        </View>
      </View>
      <Text className="text-[20px] font-semibold text-foreground">{label}</Text>
    </Pressable>
  );
}
