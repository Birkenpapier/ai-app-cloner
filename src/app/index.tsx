import { router } from 'expo-router';
import { Check, Clock, Fingerprint, KeyRound, Plus, Trash2 } from 'lucide-react-native';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CategoryCard } from '@/components/CategoryCard';
import { LargeTitleHeader } from '@/components/LargeTitleHeader';
import { SearchBar } from '@/components/SearchBar';
import { tokens } from '@/lib/tokens';

// Passwords home (shot-01): large title, search bar, 2-column grid of category
// cards, and a blue + that opens the New Password modal.
export default function PasswordsHome() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView>
        <LargeTitleHeader title="Passwords" />
        <View className="mt-2 px-4">
          <SearchBar />
        </View>

        <View className="mt-3 gap-3 px-4">
          <View className="flex-row gap-3">
            <CategoryCard icon={KeyRound} color={tokens.colors.category.all} label="All" count={0} href="/all" />
            <CategoryCard icon={Fingerprint} color={tokens.colors.category.passkeys} label="Passkeys" count={0} href="/passkeys" />
          </View>
          <View className="flex-row gap-3">
            <CategoryCard icon={Clock} color={tokens.colors.category.codes} label="Codes" count={0} href="/codes" />
            <CategoryCard icon={Check} color={tokens.colors.category.security} label="Security" count={0} href="/security" />
          </View>
          <View className="flex-row gap-3">
            <CategoryCard icon={Trash2} color={tokens.colors.category.deleted} label="Deleted" count={0} href="/deleted" />
            <View className="flex-1" />
          </View>
        </View>
      </ScrollView>

      <Pressable
        onPress={() => router.push('/new-password')}
        className="absolute bottom-4 right-5 h-11 w-11 items-center justify-center"
        accessibilityLabel="Add password"
      >
        <Plus size={32} color={tokens.colors.blue} strokeWidth={2.5} />
      </Pressable>
    </SafeAreaView>
  );
}
