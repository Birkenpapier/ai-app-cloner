import { router } from 'expo-router';
import { Apple, Mail } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { tokens } from '@/lib/tokens';

// Login / onboarding entry (t-01). Auth is BACKEND, so it's mocked — any button
// drops you into the app.
function TodoistLogo() {
  return (
    <View className="h-9 w-9 items-center justify-center rounded-lg bg-red">
      <View className="gap-[3px]">
        {[10, 8, 6].map((w) => (
          <View key={w} style={{ width: w }} className="h-[2px] rounded-full bg-white" />
        ))}
      </View>
    </View>
  );
}

export default function Login() {
  const enter = () => router.replace('/today');
  return (
    <SafeAreaView className="flex-1 bg-background px-6" edges={['top', 'bottom']}>
      <View className="mt-8 flex-row items-center justify-center gap-2">
        <TodoistLogo />
        <Text className="text-[26px] font-bold text-foreground">todoist</Text>
      </View>

      <Text className="mt-16 text-center text-[34px] font-extrabold leading-[40px] text-foreground">
        Organize your work and life, finally.
      </Text>

      <View className="flex-1" />

      <View className="gap-3 pb-2">
        <Pressable onPress={enter} className="h-14 flex-row items-center justify-center gap-2 rounded-full bg-red">
          <Mail size={20} color="#ffffff" />
          <Text className="text-[16px] font-semibold text-white">Continue with Email</Text>
        </Pressable>
        <Pressable onPress={enter} className="h-14 flex-row items-center justify-center gap-2 rounded-full bg-white">
          <Apple size={20} color="#000000" fill="#000000" />
          <Text className="text-[16px] font-semibold text-black">Continue with Apple</Text>
        </Pressable>
        <Pressable
          onPress={enter}
          className="h-14 flex-row items-center justify-center gap-2 rounded-full bg-surface2"
        >
          <Text className="text-[16px] font-bold text-red">G</Text>
          <Text className="text-[16px] font-semibold text-white">Continue with Google</Text>
        </Pressable>
        <Text className="mt-2 text-center text-[13px] text-secondary">Continue with more options</Text>
        <Text className="mt-1 text-center text-[12px] text-tertiary">
          By continuing you agree to Todoist&apos;s Terms of Service and Privacy Policy.
        </Text>
      </View>
    </SafeAreaView>
  );
}
