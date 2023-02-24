import type { WithDirectRoutes } from '#~/constants/routes.js';
import { routes as rootRoutes } from '#~/constants/index.js';

export const routes: WithDirectRoutes = {
  list: {
    path: '/',
    getPath: () => routes.list.path,
    getDirectPath: () => rootRoutes.projects.getPath()
  },
  details: {
    path: ':id',
    getPath: (id: string) => routes.details.path.replace(':id', id),
    getDirectPath: (id: string) =>
      `${rootRoutes.projects.getPath()}/${routes.details.getPath(id)}`
  },
  edit: {
    path: ':id/edit',
    getPath: (id: string) => routes.edit.path.replace(':id', id),
    getDirectPath: (id: string) =>
      `${rootRoutes.projects.getPath()}/${routes.edit.getPath(id)}`
  },
  create: {
    path: 'create',
    getPath: () => routes.create.path,
    getDirectPath: () =>
      `${rootRoutes.projects.getPath()}/${routes.create.getPath()}`
  }
};
