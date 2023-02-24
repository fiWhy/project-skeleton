import type { FromAppRouter } from '@dot/server';
import type { User } from '@prisma/client';
import { map } from 'lodash-es';

/**
 * Logic Hook.
 *
 * @param request - Request.
 * @returns Logic functionality.
 */
export const useLogic = (
  request: FromAppRouter['requests']['details']
): {
  receivers: User[];
} => {
  return {
    receivers: map(map(request.projectRequests, 'project'), 'manager')
  };
};
