import { Trash2 } from 'lucide-react-native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/EmptyState';
import { LargeTitleHeader } from '@/components/LargeTitleHeader';

// Recently Deleted (shot-06) — empty state.
export default function DeletedScreen() {
  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      <LargeTitleHeader title="Recently Deleted" backLabel="Passwords" trailing />
      <View className="flex-1">
        <EmptyState
          icon={Trash2}
          title="No Deleted Passwords"
          subtitle="Deleted passwords and passkeys are available here for 30 days before they are automatically removed."
        />
      </View>
    </SafeAreaView>
  );
}
