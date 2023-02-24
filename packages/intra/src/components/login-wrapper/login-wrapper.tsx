import { useUserCredentials } from '@dot/auth';
import { useStatus } from '@dot/query';
import type { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import type { Props } from './types.js';

/**
 * `<LoginWrapper>` component.
 */
export const LoginWrapper = ({ redirect }: Props): ReactElement => {
  const credentials = useUserCredentials();
  const { getVisited } = useStatus();

  const visited = (getVisited() ?? '').replace(/"/g, '');

  return credentials?.id_token ? (
    <Navigate to={visited ? new URL(visited).pathname : redirect} />
  ) : (
    <Outlet />
  );
};
