// ────────────────────────────────────────────────────────────────────────────
// MeisterTask domain model + seed data, transcribed VERBATIM from the App Store
// screenshots (Agenda, Board/Requests, Task detail, Notifications, Automations).
//
// Data-op triage (see src/lib/store.ts):
//   • Tasks, comments, notifications → ON-DEVICE (real CRUD via useCollection).
//   • Auth, real-time sync, org membership → BACKEND (mocked; see login screen).
//
// Avatars are colored initials, not the original photos — a raster screenshot
// doesn't contain the source images (honest limitation, stated in the report).
// ────────────────────────────────────────────────────────────────────────────
import { useCollection } from '@/lib/store';

export type Person = { id: string; name: string; initials: string; color: string };

export type TagKind = 'help' | 'open' | 'podcast' | 'social' | 'progress' | 'neutral';
export type Tag = { label: string; kind: TagKind };

export type Task = {
  id: string;
  title: string;
  project: string; // "Marketing Requests"
  section: string; // board column, e.g. "Requests"
  description: string;
  status: 'open' | 'in-progress' | 'done';
  due?: string; // "2 May 2022"
  dueUrgent?: boolean; // renders a red pill
  tags: Tag[];
  comments: number;
  checklist?: [number, number]; // [done, total]
  assigneeId?: string;
  cover?: boolean; // card has a cover image (approximated)
  today?: boolean; // shows in Agenda "My Tasks"
};

export type NotificationItem = {
  id: string;
  actorId: string;
  action: string; // "mentioned you in a comment on"
  target: string; // "[Newsletter] Digital Week 34"
  excerpt: string;
  time: string; // "JUST NOW"
  group: string; // "Today"
  read: boolean;
};

export type Activity = {
  id: string;
  taskId: string;
  actorId: string;
  kind: 'comment' | 'event';
  text: string; // comment body, or event description
  time: string; // "39 MINUTES"
};

// User-added comment (on-device, persisted).
export type Comment = { id: string; taskId: string; actorId: string; text: string; createdAt: number };

export type Automation = { id: string; title: string; icon: string; tint: string };

// ── People ──────────────────────────────────────────────────────────────────
export const PEOPLE: Record<string, Person> = {
  amanda: { id: 'amanda', name: 'Amanda Ballion', initials: 'AB', color: '#F5A623' },
  alan: { id: 'alan', name: 'Alan Dale', initials: 'AD', color: '#0087F2' },
  lucy: { id: 'lucy', name: 'Lucy Cargill', initials: 'LC', color: '#F0486B' },
  guest: { id: 'guest', name: 'Guest', initials: 'G', color: '#7B4FD1' },
};
export const ME = PEOPLE.amanda;
export function person(id?: string): Person {
  return (id && PEOPLE[id]) || PEOPLE.amanda;
}

// ── Tasks (verbatim from screenshots) ─────────────────────────────────────────
export const SEED_TASKS: Task[] = [
  {
    id: 't-csr',
    title: '[CR] CSR @ Fulenn',
    project: 'Marketing Requests',
    section: 'In Progress',
    description:
      'As part of our annual presentation, we would like to share some information about our CSR actions in the company.',
    status: 'in-progress',
    due: '2 May 2022',
    dueUrgent: true,
    tags: [{ label: 'In Progress', kind: 'progress' }],
    comments: 1,
    checklist: [0, 1],
    assigneeId: 'amanda',
    today: true,
  },
  {
    id: 't-pandemic',
    title: '[Internal] Pandemic Rules',
    project: 'Marketing Requests',
    section: 'Requests',
    description:
      'As we progress in the year, the pandemic is slowly calming down across our offices. We will issue a general communication about the new rules on March 1st.',
    status: 'open',
    tags: [{ label: 'Open', kind: 'open' }],
    comments: 0,
    assigneeId: 'amanda',
    today: true,
  },
  {
    id: 't-podcast',
    title: "[Podcast] Helpin'",
    project: 'Marketing Requests',
    section: 'Requests',
    description:
      "Our Berlin offices want to start a new podcast series called Helpin'. The goal of this podcast is to share with",
    status: 'open',
    tags: [
      { label: 'Help needed', kind: 'help' },
      { label: 'Open', kind: 'open' },
      { label: 'Podcast', kind: 'podcast' },
    ],
    comments: 1,
    checklist: [0, 2],
    assigneeId: 'alan',
    today: true,
  },
  {
    id: 't-social',
    title: '[Social Post] This week @ Fulenn',
    project: 'Marketing Requests',
    section: 'Requests',
    description: 'Highlights from the office this week — a fresh look at our new Milan location.',
    status: 'in-progress',
    due: '28 Mar 2022',
    tags: [
      { label: 'Help needed', kind: 'help' },
      { label: 'In Progress', kind: 'progress' },
      { label: 'Open', kind: 'open' },
      { label: 'Social media', kind: 'social' },
    ],
    comments: 3,
    cover: true,
    assigneeId: 'lucy',
    today: true,
  },
  {
    id: 't-whitepaper',
    title: '[Whitepaper] The Social Media Era, an opportunity for businesses?',
    project: 'Marketing Requests',
    section: 'Requests',
    description:
      'A long-form whitepaper exploring how mid-sized businesses can turn social platforms into a growth channel.',
    status: 'open',
    tags: [{ label: 'Open', kind: 'open' }],
    comments: 0,
    assigneeId: 'amanda',
    today: false,
  },
  {
    id: 't-newsletter',
    title: '[Newsletter] Digital Week 34',
    project: 'Marketing Requests',
    section: 'In Progress',
    description: 'Curate the stories and product notes going out in this week’s digital newsletter.',
    status: 'in-progress',
    tags: [{ label: 'In Progress', kind: 'progress' }],
    comments: 2,
    assigneeId: 'alan',
    today: true,
  },
  {
    id: 't-campaigns',
    title: '[March] Social Media Campaigns',
    project: 'Marketing Requests',
    section: 'Review',
    description: 'All the social media campaigns planned for March, linked in one place for review.',
    status: 'in-progress',
    tags: [{ label: 'Social media', kind: 'social' }],
    comments: 1,
    assigneeId: 'lucy',
    today: false,
  },
];

// Board columns for the Marketing Requests project, in order.
export const BOARD_SECTIONS = ['Requests', 'In Progress', 'Review', 'Done'] as const;

// Projects (the Projects tab index → Board). Only "Marketing Requests" carries
// seed tasks; the others are on-brand placeholders that open an empty board.
export type Project = { id: string; name: string; color: string };
export const PROJECTS: Project[] = [
  { id: 'marketing-requests', name: 'Marketing Requests', color: '#22B14C' },
  { id: 'product-launch', name: 'Product Launch', color: '#0087F2' },
  { id: 'design-system', name: 'Design System', color: '#7B4FD1' },
];
export function projectById(id?: string): Project {
  return PROJECTS.find((p) => p.id === id) ?? PROJECTS[0];
}

// ── Notifications (verbatim) ──────────────────────────────────────────────────
export const SEED_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    actorId: 'alan',
    action: 'mentioned you in a comment on',
    target: '[Newsletter] Digital Week 34',
    excerpt:
      '@Amanda I can see you removed the due date but this is still planned, correct? I contacted Gabriella from our office in Milan - she found a fantastic location to host this event. I will help her with all the assets.',
    time: 'JUST NOW',
    group: 'Today',
    read: false,
  },
  {
    id: 'n-2',
    actorId: 'lucy',
    action: 'mentioned you in a comment on',
    target: '[March] Social Media Campaigns',
    excerpt:
      '@Amanda I linked to this task all the social media campaigns planned for March. Feel free to link the ones you want me to prioritise this week.',
    time: 'JUST NOW',
    group: 'Today',
    read: false,
  },
];

// ── Activity feed for the CSR task (verbatim from the task-detail screenshot) ──
export const SEED_ACTIVITY: Activity[] = [
  {
    id: 'a-1',
    taskId: 't-csr',
    actorId: 'alan',
    kind: 'comment',
    text: '@Amanda I can see you removed the due date but this is still planned, correct? I contacted Gabriella from our office in Milan - she found a fantastic location to host this event. I will help her with all the assets.',
    time: '39 MINUTES',
  },
  { id: 'a-2', taskId: 't-csr', actorId: 'amanda', kind: 'event', text: 'removed the due date', time: '8 DAYS' },
  {
    id: 'a-3',
    taskId: 't-csr',
    actorId: 'amanda',
    kind: 'event',
    text: 'changed the due date of task to: 6 Mar 2022',
    time: '25 DAYS',
  },
  {
    id: 'a-4',
    taskId: 't-csr',
    actorId: 'amanda',
    kind: 'event',
    text: 'assigned Amanda Ballion the task',
    time: '25 DAYS',
  },
];

// ── Automations (verbatim list from the "Add Automation" screenshot) ──────────
export const AUTOMATIONS: Automation[] = [
  { id: 'au-assign', title: 'Assign Task', icon: 'user-plus', tint: '#0087F2' },
  { id: 'au-status', title: 'Update Status', icon: 'check-circle', tint: '#22B14C' },
  { id: 'au-move', title: 'Move Task', icon: 'move', tint: '#F5A623' },
  { id: 'au-email', title: 'Send Email', icon: 'mail', tint: '#0087F2' },
  { id: 'au-due', title: 'Set or Remove Due Date', icon: 'calendar', tint: '#F5A623' },
  { id: 'au-tags', title: 'Add or Remove Tags', icon: 'tag', tint: '#7B4FD1' },
  { id: 'au-time', title: 'Start or Stop Time Tracking', icon: 'timer', tint: '#F0486B' },
  { id: 'au-checklist', title: 'Add Checklist', icon: 'list-checks', tint: '#0087F2' },
];

export const MOTIVATION =
  'Never give up on a dream just because of the time it will take to accomplish it. The time will pass anyway.';
export const MOTIVATION_AUTHOR = '— Earl Nightingale';

// ── Hooks (on-device, reactive, persisted) ───────────────────────────────────
export function useTasks() {
  return useCollection<Task>('mt.tasks.v1', SEED_TASKS);
}
export function useNotifications() {
  return useCollection<NotificationItem>('mt.notifs.v1', SEED_NOTIFICATIONS);
}
export function useComments() {
  return useCollection<Comment>('mt.comments.v1', []);
}

/** Merge the seed activity for a task with any user-added comments (newest last). */
export function activityForTask(taskId: string, comments: Comment[]): Activity[] {
  const added: Activity[] = comments
    .filter((c) => c.taskId === taskId)
    .map((c) => ({ id: c.id, taskId, actorId: c.actorId, kind: 'comment' as const, text: c.text, time: 'JUST NOW' }));
  return [...added, ...SEED_ACTIVITY.filter((a) => a.taskId === taskId)];
}
