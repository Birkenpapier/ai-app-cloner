import { useLocalSearchParams } from 'expo-router';

import { ChatView } from '@/components/ChatView';
import { dmById } from '@/lib/data';

export default function DirectMessage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const dmId = id ?? 'kirbs';
  const dm = dmById(dmId);

  return (
    <ChatView
      channelId={dmId}
      header={{
        variant: 'dm',
        title: dm?.name ?? 'Direct Message',
        tint: dm?.tint,
        status: dm?.status,
        subtitle: dm?.group ? `${dm.members} Members` : undefined,
      }}
    />
  );
}
