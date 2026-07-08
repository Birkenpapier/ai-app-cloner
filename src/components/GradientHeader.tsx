import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { tokens } from '@/lib/tokens';

// The blue→purple gradient header used on Agenda and Notifications. Rounds off
// at the bottom where the light content scrolls up underneath it.
export function GradientHeader({ children, rounded = true }: { children: React.ReactNode; rounded?: boolean }) {
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={tokens.headerGradient as unknown as [string, string]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        paddingTop: insets.top + 6,
        borderBottomLeftRadius: rounded ? 22 : 0,
        borderBottomRightRadius: rounded ? 22 : 0,
      }}
    >
      <View className="px-4 pb-4">{children}</View>
    </LinearGradient>
  );
}
