import { type LucideIcon } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { tokens } from '@/lib/tokens';

type Props = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  /** Optional blue link under the subtitle (e.g. "More About Passkeys"). */
  linkLabel?: string;
  /** Tap handler for the link. */
  onLinkPress?: () => void;
  /** "glyph" = plain gray icon; "filledCircle" = gray circle with white icon. */
  iconVariant?: 'glyph' | 'filledCircle';
};

// Centered empty-state block shared by the five category detail screens:
// a large gray icon, a bold title, a gray subtitle, and an optional blue link.
export function EmptyState({
  icon: Icon,
  title,
  subtitle,
  linkLabel,
  onLinkPress,
  iconVariant = 'glyph',
}: Props) {
  return (
    <View className="flex-1 items-center justify-center px-10">
      {iconVariant === 'filledCircle' ? (
        <View
          className="mb-4 h-[60px] w-[60px] items-center justify-center rounded-full"
          style={{ backgroundColor: tokens.colors.secondary }}
        >
          <Icon size={34} color="#ffffff" strokeWidth={3} />
        </View>
      ) : (
        <Icon size={56} color={tokens.colors.secondary} strokeWidth={1.6} style={{ marginBottom: 16 }} />
      )}
      <Text className="text-center text-[22px] font-bold text-foreground">{title}</Text>
      <Text className="mt-2 text-center text-[16px] leading-[21px] text-secondary">{subtitle}</Text>
      {linkLabel ? (
        <Pressable onPress={onLinkPress} className="mt-5">
          <Text className="text-center text-[16px] text-blue">{linkLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
