import type { WithDirectRoutes } from '#~/constants/index.js';
import { routes as rootRoutes } from '#~/constants/index.js';

export const routes: WithDirectRoutes = {
  list: {
    path: '/',
    getPath: () => routes.list.path,
    getDirectPath: () => `${rootRoutes.home.getPath()}/${routes.list.getPath()}`
  },
  edit: {
    path: ':id/edit',
    getPath: (id: string) => routes.edit.path.replace(':id', id),
    getDirectPath: (id: string) =>
      `${rootRoutes.users.getPath()}/${routes.edit.getPath(id)}`
  },
  details: {
    path: 'details',
    getPath: () => routes.details.path,
    getDirectPath: () =>
      `${rootRoutes.users.getPath()}/${routes.details.getPath()}`
  },
  detailsById: {
    path: 'details/:id',
    getPath: (id: string) => routes.detailsById.path.replace(':id', id),
    getDirectPath: (id: string) =>
      `${rootRoutes.users.getPath()}/${routes.detailsById.getPath(id)}`
  },
  create: {
    path: 'create',
    getPath: () => routes.create.path,
    getDirectPath: () =>
      `${rootRoutes.users.getPath()}/${routes.create.getPath()}`
  }
};
