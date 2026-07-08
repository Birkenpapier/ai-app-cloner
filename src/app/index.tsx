import { router } from 'expo-router';
import { Apple, Mail } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Polygon } from 'react-native-svg';

// Login / onboarding entry. Auth is BACKEND → mocked: any button enters the app.
// MeisterTask's flat-top hexagon "M" mark, re-created as a vector (a raster
// screenshot doesn't carry the source SVG).
function MeisterMark({ size = 44 }: { size?: number }) {
  return (
    <View style={{ width: size, height: size }} className="items-center justify-center">
      <Svg width={size} height={size} viewBox="0 0 40 40">
        <Polygon points="10,3 30,3 40,20 30,37 10,37 0,20" fill="#0087F2" />
      </Svg>
      <Text style={{ position: 'absolute', fontSize: size * 0.5, fontWeight: '800', color: '#ffffff' }}>M</Text>
    </View>
  );
}

export default function Login() {
  const enter = () => router.replace('/agenda');
  return (
    <SafeAreaView className="flex-1 bg-surface px-6" edges={['top', 'bottom']}>
      <View className="mt-10 flex-row items-center justify-center gap-2.5">
        <MeisterMark />
        <Text className="text-[28px] font-bold text-foreground">MeisterTask</Text>
      </View>

      <Text className="mt-16 text-center text-[32px] font-extrabold leading-[38px] text-foreground">
        Your team.{'\n'}More productive.
      </Text>
      <Text className="mt-3 text-center text-[15px] leading-[21px] text-secondary">
        Task management that keeps everyone in sync — from the first idea to done.
      </Text>

      <View className="flex-1" />

      <View className="gap-3 pb-2">
        <Pressable
          onPress={enter}
          accessibilityLabel="Continue with Email"
          className="h-14 flex-row items-center justify-center gap-2 rounded-full bg-primary"
        >
          <Mail size={20} color="#ffffff" />
          <Text className="text-[16px] font-semibold text-white">Continue with Email</Text>
        </Pressable>
        <Pressable
          onPress={enter}
          className="h-14 flex-row items-center justify-center gap-2 rounded-full bg-foreground"
        >
          <Apple size={20} color="#ffffff" fill="#ffffff" />
          <Text className="text-[16px] font-semibold text-white">Continue with Apple</Text>
        </Pressable>
        <Pressable
          onPress={enter}
          className="h-14 flex-row items-center justify-center gap-2 rounded-full border border-border bg-surface"
        >
          <Text className="text-[16px] font-bold text-primary">G</Text>
          <Text className="text-[16px] font-semibold text-foreground">Continue with Google</Text>
        </Pressable>
        <Text className="mt-2 text-center text-[12px] leading-[17px] text-tertiary">
          By continuing you agree to MeisterTask&apos;s Terms of Service and Privacy Policy.
        </Text>
      </View>
    </SafeAreaView>
  );
}
