import type { inferRouterOutputs } from '@trpc/server';
import { createHTTPHandler } from '@trpc/server/adapters/standalone';
import http from 'http';
import { appRouter } from './router.js';
import { createContext } from './trpc.js';

export type AppRouter = typeof appRouter;
export type FromAppRouter = inferRouterOutputs<AppRouter>;

const trpcHandler = createHTTPHandler({
  router: appRouter,
  createContext
});

http
  .createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');

    // accepts OPTIONS
    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      return res.end();
    }

    // then we can pass the req/res to the tRPC handler
    void trpcHandler(req, res);
  })
  .listen(3030);

export type { Credentials } from 'google-auth-library';
export type { InfoUser } from './types.js';
