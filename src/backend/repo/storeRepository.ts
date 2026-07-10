import { getCollection, makeId } from '@/lib/store';
import type { Repository } from './types';

/**
 * v2.0 Repository backed by the SAME module-level Collection instance that
 * `useCollection` subscribes to (obtained via `getCollection`). Because writes go
 * through that shared instance's add/update/remove, a write from the tRPC caller
 * re-emits through useSyncExternalStore to every screen — persistence,
 * reload-survival, and cross-screen reactivity are all inherited from v1.
 *
 * Writing to AsyncStorage directly (readCollection/writeCollection) would persist
 * but NOT re-render. This shared-instance contract is the load-bearing detail.
 */
export function storeRepository<T extends { id: string }>(table: string, seed: T[]): Repository<T> {
  // Resolve the shared Collection LAZILY (getCollection caches by key, so this is
  // the same instance useCollection subscribes to). Resolving at construction time
  // would touch AsyncStorage during module load — before the app initializes — and
  // that early hydration proved flaky on web. Reads/writes happen after mount.
  const col = () => getCollection<T>(table, seed);
  return {
    async list() {
      return col().getSnapshot();
    },
    async get(id) {
      return col().getSnapshot().find((row) => row.id === id) ?? null;
    },
    async create(input) {
      const row = { ...input, id: input.id ?? makeId() } as T;
      col().add(row);
      return row;
    },
    async update(id, patch) {
      // Partial<Omit<T,'id'>> is a valid Partial<T> at runtime; the cast bridges
      // a generic-variance limitation in tsc (keyof T vs Exclude<keyof T,'id'>).
      col().update(id, patch as Partial<T>);
      const next = col().getSnapshot().find((row) => row.id === id);
      if (!next) throw new Error(`${table}: no row with id "${id}"`);
      return next;
    },
    async remove(id) {
      col().remove(id);
    },
  };
}
