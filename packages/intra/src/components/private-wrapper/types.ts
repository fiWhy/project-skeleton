import type { Maybe, NoChildren } from '@dot-tools/types';
import type { Role } from '@dot/models';

export type Props = NoChildren<{
  redirect: string;
  roles?: Maybe<Role[]>;
  fallback?: JSX.Element;
  ignoreVisited?: Maybe<string[]>;
}>;
