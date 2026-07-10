import { repos } from './generated/repos';

/**
 * Request context handed to every procedure.
 *
 * `userId` is a constant in v2.0 (local-only, no auth). In v2.1 it is populated
 * from Supabase Auth with zero change to routers or schema — which is what lets
 * the same routers enforce owner-scoped Row Level Security later.
 */
export const DEV_USER_ID = 'dev-user';

export interface Ctx {
  repos: typeof repos;
  userId: string;
}

export function createContext(): Ctx {
  return { repos, userId: DEV_USER_ID };
}
