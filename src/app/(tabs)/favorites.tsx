import { Star } from 'lucide-react-native';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MapCard } from '@/components/MapCard';
import { useMaps } from '@/lib/data';

export default function Favorites() {
  const { items: maps, update } = useMaps();
  const favorites = maps.filter((m) => m.favorite);
  const toggleFav = (id: string) => {
    const m = maps.find((x) => x.id === id);
    if (m) update(id, { favorite: !m.favorite });
  };

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={['top']}>
      <View className="px-4 pb-1 pt-2">
        <Text className="text-[28px] font-bold text-foreground">Favorites</Text>
        <Text className="mt-0.5 text-[13px] text-secondary">Maps you starred, ready to jump back into.</Text>
      </View>

      {favorites.length === 0 ? (
        <View className="flex-1 items-center justify-center px-10">
          <Star size={58} color="#B4B7C4" strokeWidth={1.4} />
          <Text className="mt-5 text-[15px] font-semibold text-foreground">No favorites yet</Text>
          <Text className="mt-1 text-center text-[13px] text-secondary">
            Tap the star on any map to keep it here.
          </Text>
        </View>
      ) : (
        <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingTop: 10, paddingBottom: 24 }}>
          <View className="flex-row flex-wrap justify-between">
            {favorites.map((m) => (
              <View key={m.id} style={{ width: '48.5%' }}>
                <MapCard map={m} onToggleFavorite={toggleFav} />
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
