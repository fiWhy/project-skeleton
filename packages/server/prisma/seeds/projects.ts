import { flatMap } from 'lodash-es';
import { client } from './constants.js';
import { users } from './user.js';

export const projects = {
  project: 'Custom Project',
  intra: 'Intra'
};

/**
 * Seed pronects.
 */
export const seed = async (): Promise<void> => {
  const maintainer = (await client.user.findUnique({
    where: {
      email: users.Martin.email
    }
  }))!;
  const manager = (await client.user.findUnique({
    where: {
      email: users.Adam.email
    }
  }))!;

  await client.project.createMany({
    data: [
      {
        name: projects.project,
        description: projects.project,
        managerId: manager.id,
        ownerId: maintainer.id
      },
      {
        name: projects.intra,
        description: projects.intra,
        managerId: manager.id,
        ownerId: manager.id
      }
    ]
  });

  const project = (await client.project.findUnique({
    where: {
      name: projects.project
    }
  }))!;
  const intra = (await client.project.findUnique({
    where: {
      name: projects.intra
    }
  }))!;

  const receivedProjects = [project, intra];
  const receivedUsers = [manager, maintainer];

  const data = flatMap(
    receivedProjects.map((project) =>
      receivedUsers.map((user) => ({
        projectId: project.id,
        userId: user.id
      }))
    )
  );

  await client.projectUser.createMany({
    data
  });
};
