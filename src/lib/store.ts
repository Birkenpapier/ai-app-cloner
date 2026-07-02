import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

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
// ────────────────────────────────────────────────────────────────────────────

export async function readCollection<T>(key: string): Promise<T[]> {
  const raw = await AsyncStorage.getItem(key);
  return raw ? (JSON.parse(raw) as T[]) : [];
}

export async function writeCollection<T>(key: string, items: T[]): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(items));
}

/**
 * A persisted array with CRUD, as a React hook. Items must carry a string `id`.
 * `seed` is used only on first run when nothing is stored yet.
 *
 *   const { items, add, update, remove } = useCollection<Task>('tasks');
 *   add({ id: makeId(), title: 'Buy milk', done: false }); // saves on-device
 */
export function useCollection<T extends { id: string }>(key: string, seed: T[] = []) {
  const [items, setItems] = useState<T[]>(seed);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    readCollection<T>(key).then((stored) => {
      if (!active) return;
      setItems(stored.length ? stored : seed);
      setReady(true);
    });
    return () => {
      active = false;
    };
    // seed is intentionally read once on mount
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  const persist = useCallback(
    (next: T[]) => {
      setItems(next);
      void writeCollection(key, next);
    },
    [key],
  );

  const add = useCallback((item: T) => persist([...items, item]), [items, persist]);
  const update = useCallback(
    (id: string, patch: Partial<T>) =>
      persist(items.map((i) => (i.id === id ? { ...i, ...patch } : i))),
    [items, persist],
  );
  const remove = useCallback((id: string) => persist(items.filter((i) => i.id !== id)), [items, persist]);

  return { items, ready, add, update, remove };
}

/** Small id helper for locally-created records (no crypto dependency). */
export function makeId(): string {
  return `${Date.now().toString(36)}-${Math.round(Math.random() * 1e9).toString(36)}`;
}
