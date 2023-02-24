import type { Prisma } from '@prisma/client';
import type { Role } from '@dot/models';

/**
 * Checks if user has roles.
 *
 * @param user - User.
 * @param roles - List of roles.
 * @returns Does user have role.
 */
export const getHasRole = (
  user: Prisma.UserGetPayload<{
    include: {
      roles: {
        include: {
          role: true;
        };
      };
    };
  }>,
  roles: Role[] = []
): boolean => user.roles.some((role) => roles.includes(role.role.name as Role));

/**
 * Is user a project member.
 *
 * @param project - Project.
 * @param id - User id.
 * @returns Check result.
 */
export const getIsProjectMember = (
  project: Prisma.ProjectGetPayload<{
    include: {
      members: true;
    };
  }>,
  id: string
): boolean => !!project.members.find((member) => member.userId === id);
