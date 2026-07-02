import { Check } from 'lucide-react-native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/EmptyState';
import { LargeTitleHeader } from '@/components/LargeTitleHeader';

// Security recommendations (shot-05) — empty state, gray check-in-circle icon.
export default function SecurityScreen() {
  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      <LargeTitleHeader title="Security" backLabel="Passwords" trailing />
      <View className="flex-1">
        <EmptyState
          icon={Check}
          iconVariant="filledCircle"
          title="No Security Recommendations"
          subtitle="Passwords notifies you if your passwords are easily guessed or found in a data leak."
          linkLabel="More About Security Recommendations"
        />
      </View>
    </SafeAreaView>
  );
}
