import { router } from 'expo-router';
import { Plus, Search, Zap } from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '@/components/Avatar';
import { MapCard } from '@/components/MapCard';
import { ME, useMaps } from '@/lib/data';

export default function Recent() {
  const { items: maps, update } = useMaps();
  const toggleFav = (id: string) => {
    const m = maps.find((x) => x.id === id);
    if (m) update(id, { favorite: !m.favorite });
  };

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={['top']}>
      <View className="flex-row items-center justify-between px-4 pb-1 pt-2">
        <Avatar id={ME.id} size={32} />
        <View className="flex-row items-center gap-4">
          <Zap size={22} color="#1C1E2E" />
          <Search size={22} color="#1C1E2E" />
          <Pressable onPress={() => router.push('/new-map')} accessibilityLabel="New map" hitSlop={8}>
            <Plus size={24} color="#1C1E2E" />
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingTop: 6, paddingBottom: 24 }}>
        <Text className="mb-3 text-[28px] font-bold text-foreground">Recent</Text>
        <View className="flex-row flex-wrap justify-between">
          {maps.map((m) => (
            <View key={m.id} style={{ width: '48.5%' }}>
              <MapCard map={m} onToggleFavorite={toggleFav} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
