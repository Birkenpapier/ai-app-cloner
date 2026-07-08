import { router } from 'expo-router';
import { Check } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useMaps } from '@/lib/data';
import { makeId } from '@/lib/store';
import { tokens } from '@/lib/tokens';

// New-map composer (modal). Creating a map is ON-DEVICE: it persists and shows
// up in Recent, then opens straight into the editor.
export default function NewMap() {
  const { add } = useMaps();
  const [title, setTitle] = useState('');

  const create = () => {
    const t = title.trim() || 'Untitled Map';
    const id = makeId();
    add({ id, title: t, updated: 'just now', favorite: false, accent: 'purple', shared: false });
    router.dismiss();
    router.push(`/map/${id}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-surface px-4" edges={['top', 'bottom']}>
      <View className="flex-row items-center justify-between py-3">
        <Pressable onPress={() => router.back()} accessibilityLabel="Cancel" hitSlop={8}>
          <Text className="text-[16px] text-secondary">Cancel</Text>
        </Pressable>
        <Text className="text-[16px] font-semibold text-foreground">New Map</Text>
        <Pressable
          onPress={create}
          accessibilityLabel="Create map"
          className="flex-row items-center gap-1 rounded-full bg-primary px-4 py-1.5"
        >
          <Check size={15} color="#ffffff" />
          <Text className="text-[14px] font-semibold text-white">Create</Text>
        </Pressable>
      </View>

      <View className="pt-4">
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Name your mind map"
          placeholderTextColor={tokens.colors.tertiary}
          className="text-[20px] text-foreground"
          autoFocus
          onSubmitEditing={create}
          accessibilityLabel="Map title"
          returnKeyType="done"
        />
      </View>
    </SafeAreaView>
  );
}
