import { KeyRound } from 'lucide-react-native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/EmptyState';
import { LargeTitleHeader } from '@/components/LargeTitleHeader';

// All passwords (shot-02) — empty state.
export default function AllScreen() {
  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      <LargeTitleHeader title="All" backLabel="Passwords" trailing />
      <View className="flex-1">
        <EmptyState
          icon={KeyRound}
          title="No Saved Passwords"
          subtitle="Passwords are saved automatically when signing in to websites and apps."
        />
      </View>
    </SafeAreaView>
  );
}
