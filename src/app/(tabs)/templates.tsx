import { router } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TEMPLATES, useMaps } from '@/lib/data';
import { makeId } from '@/lib/store';
import { tokens } from '@/lib/tokens';

export default function Templates() {
  const { add } = useMaps();

  const createFrom = (name: string, accent: (typeof TEMPLATES)[number]['accent']) => {
    const id = makeId();
    add({ id, title: name === 'Blank Map' ? 'Untitled Map' : name, updated: 'just now', favorite: false, accent, shared: false });
    router.push(`/map/${id}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={['top']}>
      <View className="px-4 pb-2 pt-2">
        <Text className="text-[28px] font-bold text-foreground">New Mind Map</Text>
        <Text className="mt-0.5 text-[13px] text-secondary">Start from a template — or a blank canvas.</Text>
      </View>

      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingTop: 8, paddingBottom: 24 }}>
        {TEMPLATES.map((t) => (
          <Pressable
            key={t.id}
            onPress={() => createFrom(t.name, t.accent)}
            accessibilityLabel={`Create ${t.name}`}
            className="mb-3 flex-row items-center gap-3 rounded-card bg-surface p-4"
            style={{
              shadowColor: '#1C1E2E',
              shadowOpacity: 0.06,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 3 },
              elevation: 2,
            }}
          >
            <View
              className="h-11 w-11 items-center justify-center rounded-node"
              style={{ backgroundColor: tokens.nodeColors[t.accent] }}
            >
              <Plus size={22} color="#ffffff" />
            </View>
            <View className="flex-1">
              <Text className="text-[15px] font-semibold text-foreground">{t.name}</Text>
              <Text className="text-[12px] text-secondary">{t.blurb}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
