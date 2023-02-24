import { Role } from '@dot/models';
import { client } from './constants.js';
import { getRoles } from './utils.js';

export const users = {
  Adam: {
    name: 'Adam Robins',
    email: 'adam.robins@email.com',
    refresh: null,
    picture: null,
    startFrom: new Date(2022, 8, 1)
  },
  Jack: {
    name: 'Jack Black',
    email: 'jack.black@email.com',
    refresh: null,
    picture: null,
    startFrom: new Date(2022, 10, 7)
  },
  Martin: {
    name: 'Martin',
    email: 'martin@email.com',
    refresh: null,
    picture: null,
    startFrom: new Date(2022, 9, 1)
  },
  Siri: {
    name: 'Siri Iphonovich',
    email: 'siri.iphonovich@email.com',
    refresh: null,
    picture: null,
    startFrom: new Date(2022, 8, 1)
  },
  Dora: {
    name: 'Dora Weirdo',
    email: 'dora.weirdo@email.com',
    refresh: null,
    picture: null,
    startFrom: new Date(2022, 8, 1)
  }
} as const;

const rolesByUser = {
  [users.Adam.name]: [Role.CTO, Role.Manager],
  [users.Jack.name]: [Role.QA],
  [users.Martin.name]: [Role.Client],
  [users.Siri.name]: [Role.CEO, Role.Manager],
  [users.Dora.name]: [Role.CEO, Role.Manager]
};

/**
 * Seed users.
 */
export const seed = async (): Promise<void> => {
  await client.user.createMany({
    data: Object.values(users)
  });

  const roles = await client.role.findMany({});

  (await client.user.findMany()).map(async (user) => {
    const userRoles = getRoles(
      rolesByUser[user.name as keyof typeof rolesByUser] as string[],
      roles
    ).map((userRole) => {
      return {
        roleId: userRole.id
      };
    });

    await client.user.update({
      where: {
        id: user.id
      },
      data: {
        roles: {
          createMany: {
            data: userRoles
          }
        }
      }
    });
  });
};
