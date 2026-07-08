// ────────────────────────────────────────────────────────────────────────────
// Discord domain model + seed data, transcribed from the App Store screenshots
// (the #general group-chat tile and the Messages/DM-list tile) and Discord's
// well-known dark UI. The marketing tiles are lower-fidelity than a clean
// screenshot, so layout leans on the known design language — stated in the report.
//
// Data-op triage (see src/lib/store.ts):
//   • Messages + their reactions → ON-DEVICE (real CRUD via useCollection): you
//     send, edit, delete, and react, and it persists across reloads.
//   • Servers, channels, DM threads, presence → treated as fixture data here;
//     a real backend (accounts, gateway, voice) is BACKEND (mocked). This is
//     exactly the v2 "infer the schema from the screens" story: a server has
//     channels, a channel has messages, a message has an author and reactions.
// ────────────────────────────────────────────────────────────────────────────
import { useCollection } from '@/lib/store';
import type { Status } from '@/lib/tokens';

export type User = {
  id: string;
  name: string;
  tint: string; // avatar background
  status: Status;
  bot?: boolean;
};

export type Reaction = { emoji: string; count: number; me: boolean };

export type Message = {
  id: string;
  channelId: string; // a channel id OR a dm id
  authorId: string;
  text: string;
  time: string; // "Today at 2:12 PM"
  createdAt: number;
  edited?: boolean;
  reactions?: Reaction[];
};

export type Channel = {
  id: string;
  serverId: string;
  category: string;
  name: string;
  kind: 'text' | 'voice';
};

export type Server = {
  id: string;
  name: string;
  short: string; // rail glyph (2–3 letters)
  tint: string;
  unread?: boolean;
};

export type DM = {
  id: string;
  name: string;
  tint: string;
  status: Status;
  group?: boolean;
  members?: number;
  last: string; // last-message preview
  time: string; // "30m", "24m"
};

// ── People ────────────────────────────────────────────────────────────────────
export const PEOPLE: Record<string, User> = {
  me: { id: 'me', name: 'you', tint: '#5865F2', status: 'online' },
  loky: { id: 'loky', name: 'Loky', tint: '#ED4245', status: 'online' },
  wumpus: { id: 'wumpus', name: 'Wumpus', tint: '#3BA55D', status: 'idle', bot: true },
  kirbs: { id: 'kirbs', name: 'kirbs', tint: '#FAA61A', status: 'online' },
  erica: { id: 'erica', name: 'erica', tint: '#EB459E', status: 'dnd' },
  caitlyn: { id: 'caitlyn', name: 'Caitlyn', tint: '#9B59B6', status: 'offline' },
  reb: { id: 'reb', name: 'reb', tint: '#1ABC9C', status: 'online' },
  mike: { id: 'mike', name: 'Mike', tint: '#5865F2', status: 'idle' },
};
export const ME = PEOPLE.me;
export function person(id: string): User {
  return PEOPLE[id] ?? PEOPLE.me;
}

// ── Servers (the left rail) ─────────────────────────────────────────────────────
export const SERVERS: Server[] = [
  { id: 'hangout', name: 'The Hangout', short: 'TH', tint: '#5865F2', unread: true },
  { id: 'midjourney', name: 'Midjourney', short: 'MJ', tint: '#111214' },
  { id: 'lofi', name: 'Lofi Girl', short: 'LG', tint: '#ED4245' },
  { id: 'indiedev', name: 'Indie Game Devs', short: 'ID', tint: '#3BA55D', unread: true },
  { id: 'react', name: 'Reactiflux', short: 'RX', tint: '#61DAFB' },
];
export function serverById(id: string): Server {
  return SERVERS.find((s) => s.id === id) ?? SERVERS[0];
}

// ── Channels (per server; only The Hangout is fully populated) ───────────────────
export const CHANNELS: Channel[] = [
  { id: 'general', serverId: 'hangout', category: 'Text Channels', name: 'general', kind: 'text' },
  { id: 'memes', serverId: 'hangout', category: 'Text Channels', name: 'memes', kind: 'text' },
  { id: 'clips', serverId: 'hangout', category: 'Text Channels', name: 'clips', kind: 'text' },
  { id: 'off-topic', serverId: 'hangout', category: 'Text Channels', name: 'off-topic', kind: 'text' },
  { id: 'vc-general', serverId: 'hangout', category: 'Voice Channels', name: 'General', kind: 'voice' },
  { id: 'vc-gaming', serverId: 'hangout', category: 'Voice Channels', name: 'Gaming', kind: 'voice' },
  { id: 'vc-music', serverId: 'hangout', category: 'Voice Channels', name: 'Music', kind: 'voice' },
];
export function channelsForServer(serverId: string): Channel[] {
  return CHANNELS.filter((c) => c.serverId === serverId);
}
export function channelById(id: string): Channel | undefined {
  return CHANNELS.find((c) => c.id === id);
}

// ── Direct messages (the Messages tab) ──────────────────────────────────────────
export const DMS: DM[] = [
  { id: 'poker', name: 'Poker Night', tint: '#FAA61A', status: 'online', group: true, members: 5, last: 'kirbs: are we still on for tonight?', time: '30m' },
  { id: 'dnd', name: 'DND Group', tint: '#5865F2', status: 'idle', group: true, members: 4, last: 'Mike: shoot a text in a bit', time: '24m' },
  { id: 'erica', name: 'erica', tint: '#EB459E', status: 'dnd', last: 'yaxa, sounds great', time: '1h' },
  { id: 'kirbs', name: 'kirbs', tint: '#FAA61A', status: 'online', last: 'shoot a text in a bit', time: '2h' },
  { id: 'caitlyn', name: 'Caitlyn', tint: '#9B59B6', status: 'offline', last: 'ggs! goodnight', time: '9h' },
  { id: 'reb', name: 'reb', tint: '#1ABC9C', status: 'online', last: 'lol at last night when', time: '1d' },
  { id: 'wumpus', name: 'Wumpus', tint: '#3BA55D', status: 'idle', last: 'beep boop 🤖', time: '2d' },
];
export function dmById(id: string): DM | undefined {
  return DMS.find((d) => d.id === id);
}

// ── Seed messages (verbatim-ish from the #general tile) ──────────────────────────
export const SEED_MESSAGES: Record<string, Message[]> = {
  general: [
    { id: 'm1', channelId: 'general', authorId: 'loky', text: 'yo who’s around this weekend', time: 'Today at 2:09 PM', createdAt: 1 },
    { id: 'm2', channelId: 'general', authorId: 'kirbs', text: 'me! down for some games', time: 'Today at 2:10 PM', createdAt: 2, reactions: [{ emoji: '🎮', count: 2, me: false }] },
    { id: 'm3', channelId: 'general', authorId: 'loky', text: 'hey look at this ur an emoji', time: 'Today at 2:12 PM', createdAt: 3 },
    { id: 'm4', channelId: 'general', authorId: 'wumpus', text: 'beep boop 🤖 reporting for duty', time: 'Today at 2:12 PM', createdAt: 4, reactions: [{ emoji: '😂', count: 3, me: true }, { emoji: '🔥', count: 1, me: false }] },
    { id: 'm5', channelId: 'general', authorId: 'loky', text: 'bwhaahahah', time: 'Today at 2:13 PM', createdAt: 5 },
    { id: 'm6', channelId: 'general', authorId: 'erica', text: 'i’ll bring the playlist 🎧', time: 'Today at 2:15 PM', createdAt: 6 },
  ],
  memes: [{ id: 'mm1', channelId: 'memes', authorId: 'reb', text: 'dropping the good ones here 📸', time: 'Today at 1:02 PM', createdAt: 1 }],
  dnd: [
    { id: 'd1', channelId: 'dnd', authorId: 'mike', text: 'session still on for friday?', time: 'Today at 11:20 AM', createdAt: 1 },
    { id: 'd2', channelId: 'dnd', authorId: 'mike', text: 'shoot a text in a bit', time: 'Today at 11:21 AM', createdAt: 2 },
  ],
  erica: [{ id: 'e1', channelId: 'erica', authorId: 'erica', text: 'yaxa, sounds great', time: 'Today at 10:04 AM', createdAt: 1 }],
};

// The reference tabs at the bottom of the emoji/composer sheet.
export const EMOJIS = ['😂', '🔥', '❤️', '🎮', '🎧', '👍', '😮', '🎉', '💯', '🙌', '👀', '🤖'];

// ── Notifications tab (mentions + replies) ──────────────────────────────────────
export type Notice = { id: string; actorId: string; where: string; text: string; time: string };
export const NOTICES: Notice[] = [
  { id: 'n1', actorId: 'loky', where: 'The Hangout · #general', text: '@you hey look at this ur an emoji', time: '2m' },
  { id: 'n2', actorId: 'kirbs', where: 'The Hangout · #general', text: 'reacted 🎮 to your message', time: '18m' },
  { id: 'n3', actorId: 'mike', where: 'DND Group', text: '@you session still on for friday?', time: '1h' },
  { id: 'n4', actorId: 'reb', where: 'Indie Game Devs · #showcase', text: 'replied to your thread', time: '3h' },
];

// ── Hooks (on-device, reactive, persisted) ──────────────────────────────────────
// Messages for a channel OR a dm live in one keyed collection so send/edit/delete/
// react are real CRUD and survive a reload.
export function useMessages(channelId: string) {
  return useCollection<Message>(`dc.msgs.${channelId}.v1`, SEED_MESSAGES[channelId] ?? []);
}
