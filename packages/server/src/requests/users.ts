import type { Maybe } from '@dot-tools/types';
import { adminRoles } from '@dot/models';
import { getHasRole } from '@dot/query/utils';
import type { Prisma } from '@prisma/client';
import { RequestType } from '@prisma/client';
import { VACATION_DAYS_PER_YEAR } from '../constants.js';
import { prisma } from '../prisma.js';
import type { CtxUser } from '../types.js';
import { getVacationDaysRemain } from '../utils/users.js';

/**
 * Get user.
 *
 * @param search - Search params.
 * @param search.id - User id.
 * @param search.email - User email.
 * @param include - Additional includes.
 * @returns User.
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getUser = (
  search: { id?: string; email?: string },
  include: Omit<Prisma.UserArgs['include'], 'roles'> = {}
) =>
  prisma.user.findFirstOrThrow({
    include: {
      roles: {
        include: {
          role: true
        }
      },
      ...include
    },
    where: {
      ...search
    }
  });

/**
 * @param search - Search options.
 * @param search.id - User id.
 * @param search.email - User email.
 * @param ctxUser - Current user.
 * @param options - Additional options.
 * @param options.vacationData - Should vacation data be added.
 * @returns User info with vacation details.
 */
export const getUserProfile = async (
  search: {
    id?: Maybe<string>;
    email?: Maybe<string>;
  },
  ctxUser?: CtxUser,
  options: {
    vacationData?: boolean;
  } = {}
): Promise<CtxUser | Required<CtxUser>> => {
  const isOwner =
    (!!search.id && search.id === ctxUser?.id) ||
    (!!search.email && search.email === ctxUser?.email);

  if (isOwner) {
    return ctxUser;
  }

  const user = await getUser(search, {
    projects: true
  });

  const requests = await prisma.request.findMany({
    where: {
      type: RequestType.Vacation,
      OR: [
        {
          senderId: user.id
        },
        {
          receiverId: user.id
        }
      ]
    },
    include: {
      statuses: {
        take: 1,
        orderBy: {
          createdAt: 'desc'
        }
      },
      sender: true,
      receiver: true
    }
  });

  return {
    ...user,
    ...(!!options.vacationData || (ctxUser && getHasRole(ctxUser, adminRoles))
      ? {
          vacations: getVacationDaysRemain(
            user,
            requests,
            VACATION_DAYS_PER_YEAR
          ),
          vacationDaysPerYear: VACATION_DAYS_PER_YEAR
        }
      : {})
  } as CtxUser | Required<CtxUser>;
};
