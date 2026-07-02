import { router } from 'expo-router';
import { KeyRound } from 'lucide-react-native';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { tokens } from '@/lib/tokens';

// New Password modal sheet (shot-07): Cancel / Save bar, a grouped form card
// (Website, Username, Password) and a Notes card. Visual only — no backend.
export default function NewPasswordModal() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      {/* Modal bar */}
      <View className="h-11 flex-row items-center justify-between px-4">
        <Pressable onPress={() => router.back()}>
          <Text className="text-[17px] text-blue">Cancel</Text>
        </Pressable>
        <Text className="text-[17px] font-semibold text-foreground">New Password</Text>
        {/* Save is disabled until fields are filled */}
        <Text className="text-[17px] text-secondary">Save</Text>
      </View>

      <View className="mt-4 px-4">
        {/* Credentials card */}
        <View className="overflow-hidden rounded-cell bg-surface">
          <View className="h-14 flex-row items-center px-4">
            <KeyRound size={26} color={tokens.colors.blue} strokeWidth={2.2} />
            <TextInput
              className="ml-3 flex-1 text-[17px] text-foreground"
              placeholder="Website or Label"
              placeholderTextColor={tokens.colors.secondary}
            />
          </View>
          <View className="ml-4 h-px bg-separator" />
          <View className="h-12 flex-row items-center px-4">
            <Text className="text-[17px] text-foreground">Username</Text>
            <TextInput
              className="flex-1 text-right text-[17px] text-foreground"
              placeholder="user"
              placeholderTextColor={tokens.colors.secondary}
              autoCapitalize="none"
            />
          </View>
          <View className="ml-4 h-px bg-separator" />
          <View className="h-12 flex-row items-center px-4">
            <Text className="text-[17px] text-foreground">Password</Text>
            <TextInput
              className="flex-1 text-right text-[17px] text-foreground"
              placeholder="password"
              placeholderTextColor={tokens.colors.secondary}
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Notes */}
        <Text className="mb-2 ml-4 mt-6 text-[13px] uppercase text-secondary">Notes</Text>
        <View className="rounded-cell bg-surface px-4 py-3">
          <TextInput
            placeholder="Add Notes"
            placeholderTextColor={tokens.colors.secondary}
            className="min-h-[64px] text-[17px] text-foreground"
            multiline
            textAlignVertical="top"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
