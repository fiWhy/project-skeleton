import { sendVacationRequest } from '#~/utils/mail.js';
import {
  addVacationToCalendarAndUpdateId,
  checkRequest,
  clearCalendarFromEventAndRemoveId
} from '#~/utils/requests.js';
import { managerRoles, RequestInput, RequestRole, Role } from '@dot/models';
import { getHasRole } from '@dot/query/utils';
import { RequestType } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { flatMap, map, omit } from 'lodash-es';
import {
  RequestApprovePayaload,
  RequestDetailsPayload,
  RequestsPayload
} from '../models.js';
import { prisma } from '../prisma.js';
import {
  getManageringProjects,
  isManagerOfRequestedProject
} from '../requests/projects.js';
import { isRequestAchievable } from '../requests/requests.js';
import { protectedByRolesProcedure, router } from '../trpc.js';
import { getProjectTeamMembersByRoles } from '../utils/projects.js';

export const routes = router({
  list: protectedByRolesProcedure()
    .input(RequestsPayload)
    .query(async ({ input, ctx }) => {
      const manageringProjects = await getManageringProjects(ctx.user);
      const teamMembers = flatMap(
        manageringProjects.map((project) =>
          getProjectTeamMembersByRoles(project, [Role.Manager], true)
        )
      );

      const isManager = getHasRole(ctx.user, managerRoles);
      const sendersId = map(teamMembers, 'id');

      const requests = prisma.request.findMany({
        where: {
          OR: [
            {
              [input.role === RequestRole.Personal ? 'sender' : 'receiver']: {
                id: ctx.user.id
              }
            },
            ...(input.role === RequestRole.Receiver
              ? [
                  {
                    AND: [
                      {
                        projectRequests: {
                          some: {
                            project: {
                              OR: [
                                {
                                  ownerId: ctx.user.id
                                },
                                {
                                  managerId: ctx.user.id
                                }
                              ]
                            }
                          }
                        }
                      }
                    ]
                  },
                  isManager
                    ? {
                        senderId: {
                          in: sendersId,
                          not: ctx.user.id
                        }
                      }
                    : {}
                ]
              : [])
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

      return requests;
    }),
  create: protectedByRolesProcedure()
    .input(RequestInput)
    .mutation(async ({ input, ctx }) => {
      checkRequest(input, ctx.user);

      const request = await prisma.request.create({
        include: {
          sender: {
            include: {
              projects: {
                include: {
                  project: {
                    include: {
                      manager: true
                    }
                  }
                }
              }
            }
          }
        },
        data: {
          ...omit(input, ['projects']),
          start: new Date(input.start ?? Date.now()),
          end: new Date(input.end ?? Date.now()),
          message: input.message ?? '',
          senderId: ctx.user.id,
          projectRequests: {
            createMany: {
              data: input.projects.map((id) => ({
                projectId: id
              }))
            }
          }
        }
      });

      void sendVacationRequest(
        request,
        map(
          map(
            request.sender.projects,
            (userProject) => userProject.project.manager
          ),
          'email'
        )
      );

      return request;
    }),
  setStatus: protectedByRolesProcedure()
    .input(RequestApprovePayaload)
    .mutation(async ({ input, ctx }) => {
      const request = await prisma.request.findFirstOrThrow({
        where: {
          id: input.id
        },
        include: {
          sender: true,
          projectRequests: true
        }
      })!;
      const isManager = isManagerOfRequestedProject(request, ctx.user);

      if (
        request.type === RequestType.Vacation &&
        new Date(request.start) > new Date()
      ) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `You can't change status of past events.`
        });
      }

      if (!isManager) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'You are not a manager of the project.'
        });
      }

      if (
        input.status === 'Resolved' &&
        request.type === RequestType.Vacation
      ) {
        await addVacationToCalendarAndUpdateId(request);
      }

      if (input.status === 'Rejected') {
        await clearCalendarFromEventAndRemoveId(request);
      }

      return await prisma.requestStatus.create({
        data: {
          request: {
            connect: {
              id: request.id
            }
          },
          resolver: {
            connect: {
              id: ctx.user.id
            }
          },
          status: input.status
        }
      });
    }),
  details: protectedByRolesProcedure()
    .input(RequestDetailsPayload)
    .query(async ({ input, ctx }) =>
      isRequestAchievable(
        await prisma.request.findFirstOrThrow({
          where: {
            id: input.id
          },
          include: {
            sender: true,
            receiver: true,
            statuses: {
              take: 1,
              orderBy: {
                createdAt: 'desc'
              },
              include: {
                resolver: true
              }
            },
            projectRequests: {
              include: {
                project: {
                  include: {
                    manager: true
                  }
                }
              }
            }
          }
        }),
        ctx.user
      )
    )
});
