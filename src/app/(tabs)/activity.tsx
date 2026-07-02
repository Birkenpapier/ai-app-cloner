import { Bell } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { tokens } from '@/lib/tokens';

export default function Activity() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <Text className="border-b border-border pb-3 pt-2 text-center text-[17px] font-semibold text-foreground">
        Activity
      </Text>
      <View className="flex-1 items-center justify-center px-10">
        <Bell size={48} color={tokens.colors.secondary} strokeWidth={1.4} />
        <Text className="mt-4 text-center text-[15px] text-secondary">
          Your account activity and shared-wallet updates will show up here.
        </Text>
      </View>
    </SafeAreaView>
  );
}
