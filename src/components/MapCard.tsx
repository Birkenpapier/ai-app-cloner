import { router } from 'expo-router';
import { Star } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { MiniMap } from '@/components/MiniMap';
import type { MindMap } from '@/lib/data';
import { tokens } from '@/lib/tokens';

// A map tile in the Recent / Favorites grid: thumbnail + an "updated" badge +
// title + a favorite toggle. Tapping the card opens the editor; the star is a
// sibling (not nested) so tapping it toggles the favorite without navigating.
export function MapCard({ map, onToggleFavorite }: { map: MindMap; onToggleFavorite: (id: string) => void }) {
  return (
    <View
      className="relative mb-3 overflow-hidden rounded-card bg-surface"
      style={{
        shadowColor: '#1C1E2E',
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
      }}
    >
      <Pressable onPress={() => router.push(`/map/${map.id}`)} accessibilityLabel={`Open ${map.title}`}>
        <View className="relative">
          <MiniMap accent={map.accent} />
          <View className="absolute left-2 top-2 rounded-full bg-primary px-2 py-[2px]">
            <Text className="text-[10px] font-semibold text-white">{map.updated}</Text>
          </View>
        </View>
        <View className="px-3 py-2.5 pr-9">
          <Text className="text-[13px] font-semibold leading-[17px] text-foreground" numberOfLines={2}>
            {map.title}
          </Text>
        </View>
      </Pressable>
      <Pressable
        onPress={() => onToggleFavorite(map.id)}
        accessibilityLabel={`${map.favorite ? 'Unfavorite' : 'Favorite'} ${map.title}`}
        hitSlop={8}
        className="absolute bottom-2.5 right-2.5"
      >
        <Star
          size={17}
          color={map.favorite ? tokens.colors.yellow : tokens.colors.tertiary}
          fill={map.favorite ? tokens.colors.yellow : 'transparent'}
        />
      </Pressable>
    </View>
  );
}
