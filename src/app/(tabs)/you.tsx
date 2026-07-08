import { ChevronRight, CircleUserRound, ShieldCheck, Sparkles } from 'lucide-react-native';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '@/components/Avatar';
import { ME } from '@/lib/data';
import { tokens } from '@/lib/tokens';

function Row({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <View className="mb-0.5 flex-row items-center gap-3 rounded-lg bg-sidebar px-4 py-3.5">
      {icon}
      <Text className="flex-1 text-[15px] text-foreground">{label}</Text>
      <ChevronRight size={18} color={tokens.colors.muted} />
    </View>
  );
}

export default function You() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Banner + avatar */}
        <View className="h-24 bg-blurple" />
        <View className="-mt-10 px-4">
          <View className="rounded-full border-4 border-background" style={{ alignSelf: 'flex-start' }}>
            <Avatar name={ME.name} tint={ME.tint} size={80} status="online" ringColor={tokens.colors.background} />
          </View>
          <Text className="mt-2 text-[22px] font-extrabold text-header">{ME.name}</Text>
          <Text className="text-[14px] text-muted">{ME.name}#4471</Text>
          <View className="mt-3 flex-row items-center gap-2 rounded-lg bg-sidebar px-3 py-2.5">
            <View className="h-2.5 w-2.5 rounded-full bg-online" />
            <Text className="text-[14px] font-medium text-foreground">Online</Text>
          </View>
        </View>

        <View className="mt-4 px-3">
          <Row icon={<Sparkles size={19} color={tokens.colors.idle} />} label="Nitro" />
          <Row icon={<ShieldCheck size={19} color={tokens.colors.online} />} label="Privacy & Safety" />
          <Row icon={<CircleUserRound size={19} color={tokens.colors.interactive} />} label="Edit Profile" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
