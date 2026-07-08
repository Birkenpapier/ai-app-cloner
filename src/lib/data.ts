// ────────────────────────────────────────────────────────────────────────────
// MindMeister domain model + seed data, transcribed from the App Store
// screenshots (Recent maps grid, Map editor / outline, Comments).
//
// Data-op triage (see src/lib/store.ts):
//   • Maps, nodes, comments, favorites → ON-DEVICE (real CRUD via useCollection).
//   • Auth, real-time collaboration, sync → BACKEND (mocked; see login screen).
//
// Avatars are colored initials, not the original photos (a raster screenshot
// doesn't carry the source images — an honest limitation, stated in the report).
// ────────────────────────────────────────────────────────────────────────────
import { useCollection } from '@/lib/store';
import type { NodeColor } from '@/lib/tokens';

export type Person = { id: string; name: string; initials: string; color: string };

export const PEOPLE: Record<string, Person> = {
  amanda: { id: 'amanda', name: 'Amanda Ballion', initials: 'AB', color: '#F5A623' },
  alan: { id: 'alan', name: 'Alan Dale', initials: 'AD', color: '#4B7BEC' },
  lucy: { id: 'lucy', name: 'Lucy Cargill', initials: 'LC', color: '#F0486B' },
};
export const ME = PEOPLE.amanda;
export function person(id?: string): Person {
  return (id && PEOPLE[id]) || PEOPLE.amanda;
}

// A mind map (Recent grid + Editor). `nodesKey` maps to its node collection.
export type MindMap = {
  id: string;
  title: string;
  updated: string; // "just now", "7 min"
  favorite: boolean;
  accent: NodeColor; // thumbnail + central-idea tint
  shared: boolean;
};

// One node in the outline. A flat, ordered list with `depth` renders the tree
// (with connector rails) without parent pointers — enough for the outline view.
export type NodeKind = 'idea' | 'person' | 'numbered' | 'branch';
export type MapNode = {
  id: string;
  text: string;
  color: NodeColor;
  depth: number; // 0 = central idea
  kind: NodeKind;
  icon?: string; // optional lucide icon key set via the icon picker
};

export type Comment = { id: string; actorId: string; text: string; time: string; createdAt: number };

// ── Seed maps (verbatim titles from the Recent screenshot) ────────────────────
export const SEED_MAPS: MindMap[] = [
  { id: 'campaign', title: 'Campaign Brainstorming', updated: 'just now', favorite: true, accent: 'purple', shared: true },
  { id: 'marketing', title: 'Marketing Campaign Plan', updated: '7 min', favorite: false, accent: 'orange', shared: true },
  { id: 'benefits', title: 'The Benefits of Online Mind Mapping', updated: '2 h', favorite: true, accent: 'blue', shared: false },
  { id: 'project', title: 'Project Plan', updated: 'Yesterday', favorite: false, accent: 'green', shared: false },
  { id: 'ux', title: 'UX Course Syllabus', updated: '3 d', favorite: false, accent: 'teal', shared: true },
  { id: 'meeting', title: 'Meeting Notes', updated: '1 w', favorite: false, accent: 'red', shared: false },
  { id: 'roadmap', title: 'Q3 Product Roadmap', updated: '2 w', favorite: false, accent: 'blue', shared: true },
  { id: 'content', title: 'Content Calendar', updated: '1 mo', favorite: false, accent: 'orange', shared: false },
];

// ── Seed nodes for "Campaign Brainstorming" (verbatim from the editor shot) ───
export const SEED_CAMPAIGN_NODES: MapNode[] = [
  { id: 'n-root', text: 'Campaign Brainstorming', color: 'orange', depth: 0, kind: 'idea', icon: 'lightbulb' },
  { id: 'n-problem', text: 'Problem Statement', color: 'blue', depth: 1, kind: 'branch', icon: 'message-square' },
  { id: 'n-alan', text: 'Alan', color: 'purple', depth: 1, kind: 'person' },
  { id: 'n-1', text: 'Collaborate with a well-known influencer', color: 'purple', depth: 2, kind: 'numbered' },
  { id: 'n-2', text: 'Use personalized and interactive packaging', color: 'purple', depth: 2, kind: 'numbered' },
  { id: 'n-3', text: 'Implement a "buy one, give one" program', color: 'purple', depth: 2, kind: 'numbered' },
  { id: 'n-lucy', text: 'Lucy', color: 'red', depth: 1, kind: 'person', icon: 'image' },
  { id: 'n-amanda', text: 'Amanda', color: 'orange', depth: 1, kind: 'person' },
];

// ── Seed comments for "Campaign Brainstorming" (verbatim) ─────────────────────
export const SEED_CAMPAIGN_COMMENTS: Comment[] = [
  { id: 'c-1', actorId: 'alan', text: 'I love this idea! 🚀', time: '43 minutes ago', createdAt: 1 },
  {
    id: 'c-2',
    actorId: 'lucy',
    text: "I agree with Alan! Let's give it a shot and see how it goes.",
    time: '40 minutes ago',
    createdAt: 2,
  },
];

// Templates for the "new map" tab.
export type Template = { id: string; name: string; accent: NodeColor; blurb: string };
export const TEMPLATES: Template[] = [
  { id: 't-blank', name: 'Blank Map', accent: 'purple', blurb: 'Start from a single central idea.' },
  { id: 't-brainstorm', name: 'Brainstorming', accent: 'orange', blurb: 'Diverge fast, group later.' },
  { id: 't-project', name: 'Project Plan', accent: 'green', blurb: 'Goals, milestones, owners.' },
  { id: 't-swot', name: 'SWOT Analysis', accent: 'blue', blurb: 'Strengths · Weaknesses · Opportunities · Threats.' },
  { id: 't-meeting', name: 'Meeting Notes', accent: 'red', blurb: 'Agenda, decisions, action items.' },
  { id: 't-okr', name: 'OKRs', accent: 'teal', blurb: 'Objectives and key results.' },
];

// ── Hooks (on-device, reactive, persisted) ───────────────────────────────────
export function useMaps() {
  return useCollection<MindMap>('mm.maps.v1', SEED_MAPS);
}
export function useNodes(mapId: string) {
  return useCollection<MapNode>(`mm.nodes.${mapId}.v1`, mapId === 'campaign' ? SEED_CAMPAIGN_NODES : []);
}
export function useMapComments(mapId: string) {
  return useCollection<Comment>(`mm.comments.${mapId}.v1`, mapId === 'campaign' ? SEED_CAMPAIGN_COMMENTS : []);
}
