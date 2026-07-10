import { initTRPC } from '@trpc/server';
import type { Ctx } from '../context';

/**
 * tRPC init. The generated per-entity routers import `router` + `publicProcedure`
 * from here; the in-process caller (client.ts) uses `createCallerFactory`.
 *
 * v2.1 keeps this file byte-identical — only the transport in client.ts changes
 * (createCaller -> httpBatchLink over Hono/Supabase).
 */
// `allowOutsideOfServer` is required because v2.0 runs the tRPC router IN the
// browser via an in-process caller (the clone is a static SPA, no server). tRPC
// v11 guards against accidental server-in-browser; here it is deliberate. In v2.1
// the router moves behind an HTTP handler and this flag is no longer needed.
const t = initTRPC.context<Ctx>().create({ allowOutsideOfServer: true });

export const router = t.router;
export const publicProcedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;
