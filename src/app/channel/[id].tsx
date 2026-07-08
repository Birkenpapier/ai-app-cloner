import { useLocalSearchParams } from 'expo-router';

import { ChatView } from '@/components/ChatView';
import { channelById, serverById } from '@/lib/data';

export default function Channel() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const channelId = id ?? 'general';
  const channel = channelById(channelId);
  const server = channel ? serverById(channel.serverId) : undefined;

  return (
    <ChatView
      channelId={channelId}
      header={{ variant: 'channel', title: channel?.name ?? 'general', subtitle: server?.name }}
    />
  );
}
