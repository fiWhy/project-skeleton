import { useUser, useUserCredentials } from '@dot/auth';
import type { Role } from '@dot/models';
import { useStatus } from '@dot/query';
import { map, union } from 'lodash-es';
import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import type { Props } from './types.js';

/**
 * `<PrivateWrapper>` component.
 */
export const PrivateWrapper = ({
  redirect,
  roles,
  fallback,
  ignoreVisited = []
}: Props): ReactElement => {
  const credentials = useUserCredentials();
  const user = useUser();
  const { updateVisited } = useStatus();
  const visited = window.location.href;

  const userRoles = map(map(user?.roles, 'role'), 'role.name') as Role[];
  const isAuthorized = !roles?.length || union(userRoles, roles).length;

  useEffect(() => {
    return () => {
      if (ignoreVisited.some((ignore) => visited.includes(ignore))) return;

      updateVisited(visited);
    };
  }, [updateVisited, ignoreVisited, visited]);

  if (!credentials) {
    return <Navigate to={redirect} />;
  }

  if (!user) {
    return fallback ?? <>Waiting for user update...</>;
  }

  return !isAuthorized ? <Navigate to={redirect} /> : <Outlet />;
};
