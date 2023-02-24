import { ProjectCreateInput, ProjectEditInput, Role } from '@dot/models';
import { getHasRole } from '@dot/query/utils';
import { ProjectDetailsPayload } from '../models.js';
import { prisma } from '../prisma.js';
import { protectedByRolesProcedure, router } from '../trpc.js';
import { updateOrCreate } from '../utils/projects.js';

export const routes = router({
  list: protectedByRolesProcedure().query(({ ctx }) =>
    prisma.project.findMany({
      ...(getHasRole(ctx.user, [Role.CEO, Role.CTO])
        ? {}
        : {
            where: {
              OR: [
                {
                  members: {
                    some: {
                      userId: ctx.user.id
                    }
                  }
                },
                {
                  ownerId: ctx.user.id
                },
                {
                  managerId: ctx.user.id
                }
              ]
            }
          }),
      orderBy: [
        {
          id: 'desc'
        }
      ],
      include: {
        owner: true,
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
  ),
  details: protectedByRolesProcedure()
    .input(ProjectDetailsPayload)
    .query(async ({ input, ctx }) => {
      const project = await prisma.project.findFirstOrThrow({
        where: {
          id: input.id,
          ...(ctx.isAdmin
            ? {}
            : {
                OR: [
                  {
                    members: {
                      some: {
                        userId: ctx.user.id
                      }
                    }
                  },
                  {
                    ownerId: ctx.user.id
                  },
                  {
                    managerId: ctx.user.id
                  }
                ]
              })
        },
        include: {
          owner: true,
          manager: true,
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
      });

      return project;
    }),
  create: protectedByRolesProcedure([Role.CEO, Role.CTO])
    .input(ProjectCreateInput)
    .mutation(async ({ input }) => {
      return updateOrCreate(input);
    }),
  edit: protectedByRolesProcedure([Role.CEO, Role.CTO])
    .input(ProjectEditInput)
    .mutation(({ input }) => {
      return updateOrCreate(input, input.id);
    })
});
