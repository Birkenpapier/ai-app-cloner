import { router } from 'expo-router';
import { Fingerprint } from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { tokens } from '@/lib/tokens';

const PARAGRAPHS = [
  'A more secure alternative to passwords for signing in to online accounts.',
  'Passkeys are digital keys saved to your iCloud Keychain. They are backed up and sync across all your Apple devices. You can use a passkey to sign in to apps and websites on iPhone, iPad, Mac, Apple TV, Vision Pro and web browsers on other platforms.',
  'Passkeys keep your accounts more secure than passwords do. They use powerful cryptography, which makes every passkey strong. Unlike passwords, malicious websites cannot trick you into giving away your passkeys.',
  "You sign in to apps and websites with passkeys differently to how you do with passwords. When prompted to sign in with a passkey, you use Face ID, Touch ID, Optic ID or your device passcode. Your biometric information and device passcode are never sent to the service you're signing in to.",
];

// More About Passkeys info modal (shot-08): Done bar, centered icon + title,
// body copy transcribed from the screenshot.
export default function AboutPasskeysModal() {
  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      <View className="h-11 flex-row items-center justify-end px-4">
        <Pressable onPress={() => router.back()}>
          <Text className="text-[17px] text-blue">Done</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerClassName="px-6 pb-10">
        <View className="items-center pt-2">
          <Fingerprint size={56} color={tokens.colors.blue} strokeWidth={1.8} />
          <Text className="mt-3 text-[28px] font-bold text-foreground">Passkeys</Text>
        </View>
        {PARAGRAPHS.map((p, i) => (
          <Text
            key={i}
            className={`text-[16px] leading-[22px] text-foreground ${i === 0 ? 'mt-4 text-center' : 'mt-4'}`}
          >
            {p}
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
