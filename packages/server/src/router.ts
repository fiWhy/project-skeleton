import { projects, requests, users } from './routes/index.js';
import { router } from './trpc.js';

export const appRouter = router({
  users,
  requests,
  projects
});
