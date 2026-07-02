import { router } from 'expo-router';
import { Archive, HelpCircle, Lightbulb, MessageSquare, Plus, Settings, Trash2 } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { tokens } from '@/lib/tokens';

function Item({ icon: Icon, label, active, onPress }: { icon: typeof Archive; label: string; active?: boolean; onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      className="mx-3 mb-1 flex-row items-center gap-5 rounded-full px-4 py-3"
      style={active ? { backgroundColor: '#3c4043' } : undefined}
    >
      <Icon size={20} color={active ? tokens.colors.blue : tokens.colors.secondary} />
      <Text className="text-[15px]" style={{ color: active ? tokens.colors.blue : tokens.colors.foreground }}>
        {label}
      </Text>
    </Pressable>
  );
}

// Navigation drawer (k-03), presented over a dimmed backdrop.
export default function Menu() {
  return (
    <View className="flex-1 flex-row" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <View className="w-[300px] bg-background">
        <SafeAreaView edges={['top']}>
          <Text className="px-5 pb-3 pt-3 text-[20px] text-foreground">
            <Text className="font-semibold">Google </Text>Keep
          </Text>
          <View className="mb-2 border-b border-border" />
          <Item icon={Lightbulb} label="Notes" active onPress={() => router.back()} />
          <Text className="px-5 pb-1 pt-4 text-[12px] uppercase text-secondary">Labels</Text>
          <Item icon={Plus} label="Create new label" onPress={() => router.replace('/labels')} />
          <View className="my-2 mx-5 border-b border-border" />
          <Item icon={Archive} label="Archive" onPress={() => router.back()} />
          <Item icon={Trash2} label="Bin" onPress={() => router.back()} />
          <View className="my-2 mx-5 border-b border-border" />
          <Item icon={Settings} label="Settings" onPress={() => router.back()} />
          <Item icon={MessageSquare} label="Send app feedback" onPress={() => router.back()} />
          <Item icon={HelpCircle} label="Help" onPress={() => router.back()} />
        </SafeAreaView>
      </View>
      <Pressable className="flex-1" onPress={() => router.back()} accessibilityLabel="Close menu" />
    </View>
  );
}
