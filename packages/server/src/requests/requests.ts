import { prisma } from '../prisma.js';
import type { Prisma } from '@prisma/client';
import { getHasRole } from '@dot/query/utils';
import { adminRoles } from '@dot/models';
import { TRPCError } from '@trpc/server';
import { map } from 'lodash-es';

type RequestInput = Prisma.RequestGetPayload<{
  include: {
    sender: true;
    receiver: true;
    statuses: {
      include: {
        resolver: true;
      };
    };
    projectRequests: {
      include: {
        project: {
          include: {
            manager: true;
          };
        };
      };
    };
  };
}>;

/**
 * @param request - Found request.
 * @param user - Requester.
 * @returns Available request or exception in case of you don't have access.
 */
export const isRequestAchievable = async (
  request: RequestInput,
  user: Prisma.UserGetPayload<{
    include: {
      roles: {
        include: {
          role: true;
        };
      };
    };
  }>
): Promise<RequestInput | never> => {
  const senderId = request.senderId;

  if (getHasRole(user, adminRoles) || senderId === user.id) {
    return request;
  }
  const senderProjects = await prisma.project.findMany({
    where: {
      members: {
        some: {
          userId: senderId
        }
      }
    }
  });

  if (
    !!map(senderProjects, 'ownerId').includes(user.id) ||
    !!map(senderProjects, 'managerId').includes(user.id)
  ) {
    throw new TRPCError({
      code: 'FORBIDDEN'
    });
  }
  return request;
};
