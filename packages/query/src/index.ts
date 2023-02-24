export { useStatus } from './hooks/index.js';
export * from './query-provider.jsx';
export * from './query-provider-plain.jsx';

import { trpc } from './trpc.js';
export const request = trpc;
