import { Car, Home, PartyPopper, ShoppingBag, Utensils } from 'lucide-react-native';
import { View } from 'react-native';

import { type CategoryKey, categoryOf } from '@/lib/transactions';

const ICONS = {
  food: Utensils,
  shopping: ShoppingBag,
  transport: Car,
  home: Home,
  fun: PartyPopper,
} as const;

export function CategoryIcon({ category, size = 40 }: { category: CategoryKey; size?: number }) {
  const Icon = ICONS[category];
  const { color } = categoryOf(category);
  return (
    <View
      className="items-center justify-center rounded-full"
      style={{ width: size, height: size, backgroundColor: color }}
    >
      <Icon size={size * 0.5} color="#ffffff" strokeWidth={2.2} />
    </View>
  );
}
