/**
 * The DRIVER swap seam. Every backend read/write goes through a Repository, so
 * the storage engine is swappable without touching the tRPC routers, the Drizzle
 * schema, or the UI.
 *
 * - v2.0 (this slice): `storeRepository` over the on-device AsyncStorage store.
 * - v2.1: a DrizzleRepository over Supabase Postgres. Same interface, same routers.
 */
export interface Repository<T extends { id: string }> {
  list(): Promise<T[]>;
  get(id: string): Promise<T | null>;
  create(input: Omit<T, 'id'> & { id?: string }): Promise<T>;
  update(id: string, patch: Partial<Omit<T, 'id'>>): Promise<T>;
  remove(id: string): Promise<void>;
}
