import type { NoChildren } from '@dot-tools/types';
import type { FromAppRouter } from '@dot/server';

export type Props = NoChildren<{
  users: FromAppRouter['users']['list'];
}>;
