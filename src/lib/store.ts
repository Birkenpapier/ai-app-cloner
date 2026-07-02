import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSyncExternalStore } from 'react';

// ────────────────────────────────────────────────────────────────────────────
// On-device persistence for cloned apps.
//
// The `/clone-app` "data-op triage" step classifies each of the cloned app's
// data actions as BACKEND (server/auth/sync → mocked with a `// TODO`) or
// ON-DEVICE (local CRUD, drafts, settings → implemented FOR REAL here). This is
// what makes a clone actually work instead of being a dead shell.
//
// Backed by AsyncStorage (which is localStorage on web), so persistence works
// offline and survives reloads — including in the web build used for demos.
//
// Each `key` maps to ONE shared store, so adding on one screen instantly shows
// up on every other screen reading the same key. A per-component useState would
// give each screen its own private copy — the classic "add a task, it doesn't
// appear in the list" bug. We use useSyncExternalStore over a module-level store
// to get real cross-screen reactivity.
// ────────────────────────────────────────────────────────────────────────────

export async function readCollection<T>(key: string): Promise<T[]> {
  const raw = await AsyncStorage.getItem(key);
  return raw ? (JSON.parse(raw) as T[]) : [];
}

export async function writeCollection<T>(key: string, items: T[]): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(items));
}

type WithId = { id: string };

class Collection<T extends WithId> {
  items: T[];
  ready = false;
  private listeners = new Set<() => void>();

  constructor(
    private readonly key: string,
    seed: T[],
  ) {
    this.items = seed;
    // Hydrate once from storage without blocking render. On web, AsyncStorage is
    // localStorage; guard SSR/prerender where `window` is absent.
    if (typeof window !== 'undefined') {
      void readCollection<T>(this.key).then((stored) => {
        if (stored.length) this.items = stored;
        this.ready = true;
        this.emit();
      });
    } else {
      this.ready = true;
    }
  }

  subscribe = (cb: () => void): (() => void) => {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  };

  getSnapshot = (): T[] => this.items;

  private emit() {
    for (const l of this.listeners) l();
  }

  // Functional updates read `this.items` at call time (not a captured closure),
  // so rapid successive writes never drop each other.
  private commit(next: T[]) {
    this.items = next;
    void writeCollection(this.key, next);
    this.emit();
  }

  add = (item: T) => this.commit([...this.items, item]);
  update = (id: string, patch: Partial<T>) =>
    this.commit(this.items.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  remove = (id: string) => this.commit(this.items.filter((i) => i.id !== id));
}

const collections = new Map<string, Collection<WithId>>();

function getCollection<T extends WithId>(key: string, seed: T[]): Collection<T> {
  let c = collections.get(key);
  if (!c) {
    c = new Collection<T>(key, seed) as unknown as Collection<WithId>;
    collections.set(key, c);
  }
  return c as unknown as Collection<T>;
}

/**
 * A persisted array with CRUD, shared across every screen that uses the same
 * `key`. Items must carry a string `id`. `seed` is used only the first time a
 * given key is initialized (nothing stored yet).
 *
 *   const { items, add, update, remove } = useCollection<Task>('tasks');
 *   add({ id: makeId(), title: 'Buy milk', done: false }); // saves + syncs everywhere
 */
export function useCollection<T extends { id: string }>(key: string, seed: T[] = []) {
  const store = getCollection<T>(key, seed);
  const items = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
  return { items, ready: store.ready, add: store.add, update: store.update, remove: store.remove };
}

/** Small id helper for locally-created records (no crypto dependency). */
export function makeId(): string {
  return `${Date.now().toString(36)}-${Math.round(Math.random() * 1e9).toString(36)}`;
}
