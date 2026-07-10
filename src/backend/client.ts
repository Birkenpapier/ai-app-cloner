import { appRouter } from './generated/appRouter';
import { createContext } from './context';
import { createCallerFactory } from './trpc/init';

/**
 * In-process, fully typed tRPC caller. The clone is a static SPA (no server), so
 * v2.0 invokes procedures directly via createCaller — no HTTP, no @trpc/client.
 *
 * Call sites read like a network client: `await api.notes.create({ ... })`.
 * v2.1 replaces THIS ONE LINE with createTRPCClient({ links: [httpBatchLink({ url })] })
 * against the Supabase-hosted appRouter; every call site stays identical.
 */
export const api = createCallerFactory(appRouter)(createContext());

export type Api = typeof api;
