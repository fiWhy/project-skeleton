import { request } from '@dot/query';
import type { FromAppRouter } from '@dot/server';
import { RequestRole } from '@dot/models';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Logic Hook.
 *
 * @returns Logic functionality.
 */
export const useLogic = (): {
  requests: FromAppRouter['requests']['list'];
  setRole: (role: RequestRole) => void;
  role: RequestRole;
} => {
  const [params, setParams] = useSearchParams({
    role: RequestRole.Personal
  });

  const role = params.get('role') as RequestRole;

  const { data: requests = [] } = request.requests.list.useQuery({
    role
  });

  const handleSetRole = useCallback(
    (role: string) => {
      setParams({
        role
      });
    },
    [setParams]
  );

  return {
    requests,
    setRole: handleSetRole,
    role
  };
};
