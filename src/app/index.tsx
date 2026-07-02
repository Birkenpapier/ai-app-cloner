import { router } from 'expo-router';
import { Building2, CreditCard, Landmark, PiggyBank, Wallet } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { tokens } from '@/lib/tokens';

// Onboarding (s-01). The original shows a grid of real bank logos; we use generic
// finance chips instead — the tool copies layout/function, not brand assets.
const CHIPS = [Landmark, CreditCard, Wallet, Building2, PiggyBank, Landmark, CreditCard, Wallet, Building2];

export default function Onboarding() {
  return (
    <View className="flex-1 bg-background">
      <View className="items-center gap-3 px-6 pb-10 pt-24" style={{ backgroundColor: tokens.colors.green }}>
        <View className="flex-row flex-wrap justify-center gap-3">
          {CHIPS.map((Icon, i) => (
            <View key={i} className="h-12 w-24 items-center justify-center rounded-full bg-white">
              <Icon size={20} color={tokens.colors.green} />
            </View>
          ))}
        </View>
      </View>

      <SafeAreaView className="flex-1 justify-end px-6 pb-4" edges={['bottom']}>
        <Text className="text-center text-[28px] font-bold text-foreground">Tracking money made easy</Text>
        <Text className="mt-3 text-center text-[14px] text-secondary">
          You&apos;re in the right place to get your finances on track.
        </Text>
        <Pressable
          onPress={() => router.replace('/timeline')}
          className="mt-6 h-14 items-center justify-center rounded-full bg-green"
        >
          <Text className="text-[16px] font-semibold text-white">Get Started</Text>
        </Pressable>
        <Text className="mt-4 text-center text-[13px] text-secondary">
          Have an account? <Text className="font-semibold text-foreground">Sign In</Text>
        </Text>
      </SafeAreaView>
    </View>
  );
}
