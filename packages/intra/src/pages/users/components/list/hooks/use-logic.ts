import { request } from '@dot/query';
import type { FromAppRouter } from '@dot/server';
import { getHasRole } from '@dot/query/utils';
import { useUser } from '@dot/auth';
import { Role } from '@dot/models';

/**
 * Logic Hook.
 *
 * @returns Logic functionality.
 */
export const useLogic = (): {
  users: FromAppRouter['users']['list'];
  isManager: boolean;
} => {
  const user = useUser();
  const { data: users = [] } = request.users.list.useQuery();

  return {
    isManager: !!user
      ? getHasRole(user, [Role.CEO, Role.CEO, Role.Manager])
      : false,
    users
  };
};
