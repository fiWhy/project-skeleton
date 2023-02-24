import type { CtxUser } from '#~/types.js';
import { managerRoles } from '@dot/models';
import { getHasRole } from '@dot/query/utils';
import type { Prisma, Project } from '@prisma/client';
import { map } from 'lodash-es';
import { prisma } from '../prisma.js';

/**
 * Find project where user has a manager role.
 *
 * @param user - User.
 * @returns Projects list.
 */
export const getManageringProjects = (
  user: Prisma.UserGetPayload<{
    include: {
      roles: {
        include: {
          role: true;
        };
      };
    };
  }>
): Promise<
  Prisma.ProjectGetPayload<{
    include: {
      members: {
        include: {
          user: {
            include: {
              roles: {
                include: { role: true };
              };
            };
          };
        };
      };
    };
  }>[]
> =>
  getHasRole(user, managerRoles)
    ? prisma.project.findMany({
        where: {
          OR: [{ managerId: user.id }, { ownerId: user.id }]
        },
        include: {
          members: {
            include: {
              user: {
                include: {
                  roles: {
                    include: {
                      role: true
                    }
                  }
                }
              }
            }
          }
        }
      })
    : Promise.resolve([]);

/**
 * @param id - User id.
 * @returns Projects user attached to.
 */
export const getUserProjects = (id: string): Promise<Project[]> =>
  prisma.project.findMany({
    where: {
      members: {
        some: {
          userId: id
        }
      }
    }
  });

/**
 * @param userId - User id.
 * @param projectId - Project id.
 * @returns Is user a project manager.
 */
export const isProjectManager = async (
  userId: string,
  projectId: string
): Promise<boolean> =>
  !!(await prisma.project.count({
    where: {
      id: projectId,
      managerId: userId
    }
  }));

/**
 * @param request - Request.
 * @param user - Current user.
 * @returns Is user a manager of the project.
 */
export const isManagerOfRequestedProject = (
  request: Prisma.RequestGetPayload<{
    include: {
      projectRequests: true;
    };
  }>,
  user: CtxUser
): boolean => {
  const projectIds = map(request.projectRequests, 'projectId');
  return user.projects.some((project) => projectIds.includes(project.id));
};
