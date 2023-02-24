import { prisma } from '#~/prisma.js';
import type { Maybe } from '@dot-tools/types';
import type { ProjectInput, Role } from '@dot/models';
import type { Prisma, Project, User } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { intersection, map } from 'lodash-es';
import type z from 'zod';

/**
 * Find start dates per project.
 *
 * @param projects - Projects list with user in a team.
 * @returns Start dates by project.
 */
export const getStartDateByManager = (
  projects: Project[]
): Record<string, string> => {
  return projects.reduce(
    (acc, project) => ({
      ...acc,
      [project.name]: [project.createdAt]
    }),
    {}
  );
};

/**
 * @param project - Project.
 * @param roles - Roles needed.
 * @param exception - Should calculate roles exception.
 * @returns Team members with necessary roles.
 */
export const getProjectTeamMembersByRoles = (
  project: Prisma.ProjectGetPayload<{
    include: {
      members: {
        include: {
          user: {
            include: {
              roles: true;
            };
          };
        };
      };
    };
  }>,
  roles: Role[],
  exception?: Maybe<boolean>
): User[] =>
  project.members
    .filter((member) => {
      const hasRoles = !!intersection(map(member.user.roles, 'name'), roles)
        .length;

      return exception ? !hasRoles : hasRoles;
    })
    .map((member) => member.user);

/**
 * @param input - Project input.
 * @param id - Project id.
 * @returns Updated project.
 */
export const updateOrCreate = async (
  input: z.infer<typeof ProjectInput>,
  id?: string
): Promise<Project> => {
  try {
    const owner = await prisma.user.findFirstOrThrow({
      select: {
        id: true
      },
      where: {
        email: input.owner
      }
    });

    const manager = await prisma.user.findFirstOrThrow({
      select: {
        id: true
      },
      where: {
        email: input.manager
      }
    });

    const data = {
      name: input.name,
      description: input.description,
      owner: {
        connect: owner
      },
      manager: {
        connect: manager
      }
    };

    if (!!id) {
      return prisma.project.update({
        where: {
          id
        },
        data
      });
    }

    return prisma.project.create({
      data
    });
  } catch (e) {
    throw new TRPCError({
      message: `Project was not created: ${(e as Error).message}`,
      code: 'BAD_REQUEST'
    });
  }
};
