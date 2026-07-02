import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSyncExternalStore } from 'react';

import { makeId } from './store';

// On-device task store (the "actually works" feature). A global, reactive store
// so a task added in the add-task modal instantly shows across every tab, and
// persists across reloads via AsyncStorage (localStorage on web). This is the
// clone's LOCAL data-op — no backend involved.

export type Task = {
  id: string;
  title: string;
  done: boolean;
  today: boolean; // shows in the Today tab
};

const KEY = 'todoist.tasks';
let tasks: Task[] = [];
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function persist() {
  void AsyncStorage.setItem(KEY, JSON.stringify(tasks));
  emit();
}

// Hydrate from storage on module load (browser only — skip during any SSR).
if (typeof window !== 'undefined') {
  void AsyncStorage.getItem(KEY).then((raw) => {
    if (raw) {
      tasks = JSON.parse(raw) as Task[];
      emit();
    }
  });
}

export function addTask(title: string, today = true) {
  tasks = [...tasks, { id: makeId(), title: title.trim(), done: false, today }];
  persist();
}

export function toggleTask(id: string) {
  tasks = tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  persist();
}

export function removeTask(id: string) {
  tasks = tasks.filter((t) => t.id !== id);
  persist();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

export function useTasks(): Task[] {
  return useSyncExternalStore(
    subscribe,
    () => tasks,
    () => tasks,
  );
}
