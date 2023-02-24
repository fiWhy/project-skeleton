import type { WithDirectRoutes } from '#~/constants/index.js';
import { routes as rootRoutes } from '#~/constants/routes.js';

export const routes: WithDirectRoutes = {
  list: {
    path: '/',
    getPath: () => routes.list.path,
    getDirectPath: () => rootRoutes.requests.getPath()
  },
  edit: {
    path: ':id/edit',
    getPath: (id: string) => routes.edit.path.replace(':id', id),
    getDirectPath: (id: string) =>
      `${rootRoutes.requests.getPath()}/${routes.edit.getPath(id)}`
  },
  details: {
    path: ':id',
    getPath: (id: string) => routes.details.path.replace(':id', id),
    getDirectPath: (id: string) =>
      `${rootRoutes.requests.getPath()}/${routes.details.getPath(id)}`
  },
  create: {
    path: 'create',
    getPath: () => routes.create.path,
    getDirectPath: () =>
      `${rootRoutes.requests.getPath()}/${routes.create.getPath()}`
  }
};
