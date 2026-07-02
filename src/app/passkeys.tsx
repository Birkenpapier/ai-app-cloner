import { router } from 'expo-router';
import { Fingerprint } from 'lucide-react-native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/EmptyState';
import { LargeTitleHeader } from '@/components/LargeTitleHeader';

// Passkeys (shot-03) — empty state with a link to the About Passkeys modal.
export default function PasskeysScreen() {
  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      <LargeTitleHeader title="Passkeys" backLabel="Passwords" trailing />
      <View className="flex-1">
        <EmptyState
          icon={Fingerprint}
          title="No Saved Passkeys"
          subtitle="Passkeys provide the strongest security available for your accounts. When using a passkey, you use Face ID, Touch ID, Optic ID or your passcode to sign in."
          linkLabel="More About Passkeys"
          onLinkPress={() => router.push('/about-passkeys')}
        />
      </View>
    </SafeAreaView>
  );
}
