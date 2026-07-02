import { Clock } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/EmptyState';
import { LargeTitleHeader } from '@/components/LargeTitleHeader';

// Verification codes (shot-04) — empty state with a bottom footer count.
export default function CodesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      <LargeTitleHeader title="Codes" backLabel="Passwords" trailing />
      <View className="flex-1">
        <EmptyState
          icon={Clock}
          title="No Saved Verification Codes"
          subtitle="Verification codes provide an extra layer of security to help keep your accounts safe."
          linkLabel="More About Verification Codes"
        />
      </View>
      <Text className="pb-2 text-center text-[15px] text-foreground">0 Verification Codes</Text>
    </SafeAreaView>
  );
}
