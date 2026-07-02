import { Mic, Search } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { tokens } from '@/lib/tokens';

// Static search field (visual only — no backend). Matches the Passwords home
// search bar: gray rounded fill, leading magnifier, "Search" placeholder,
// trailing microphone.
export function SearchBar() {
  return (
    <View className="h-9 flex-row items-center rounded-search bg-search px-2">
      <Search size={18} color={tokens.colors.secondary} strokeWidth={2.5} />
      <Text className="ml-1.5 flex-1 text-[17px] text-secondary">Search</Text>
      <Mic size={18} color={tokens.colors.secondary} strokeWidth={2} />
    </View>
  );
}
