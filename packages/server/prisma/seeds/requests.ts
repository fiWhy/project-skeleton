import { prisma } from '#~/prisma.js';
import { RequestStatusType, RequestType } from '@prisma/client';
import { client } from './constants.js';
import { users } from './user.js';

const vacations = [
  {
    type: RequestType.Vacation,
    start: new Date(2022, 11, 27),
    end: new Date(2022, 11, 28)
  },
  {
    type: RequestType.Vacation,
    start: new Date(2023, 0, 19),
    end: new Date(2023, 0, 21)
  }
];

/**
 * Seed requests.
 */
export const seed = async (): Promise<void> => {
  const user = (await prisma.user.findUnique({
    where: {
      email: users.Jack.email
    },
    include: {
      projects: true
    }
  }))!;
  const resolver = (await prisma.user.findUnique({
    where: {
      email: users.Adam.email
    },
    include: {
      projects: true
    }
  }))!;

  await Promise.all([
    ...vacations.map(
      async (vacation) =>
        await client.request.create({
          data: {
            ...vacation,
            statuses: {
              create: {
                status: RequestStatusType.Resolved,
                resolver: {
                  connect: {
                    id: resolver.id
                  }
                }
              }
            },
            projectRequests: {
              createMany: {
                data: user.projects.map((project) => ({
                  projectId: project.projectId
                }))
              }
            },
            senderId: user.id
          }
        })
    ),
    ...vacations.map(
      async (vacation) =>
        await client.request.create({
          data: {
            ...vacation,
            statuses: {
              create: {
                status: RequestStatusType.Resolved,
                resolver: {
                  connect: {
                    id: resolver.id
                  }
                }
              }
            },
            senderId: resolver.id,
            projectRequests: {
              createMany: {
                data: resolver.projects.map((project) => ({
                  projectId: project.projectId
                }))
              }
            }
          }
        })
    )
  ]);
};
