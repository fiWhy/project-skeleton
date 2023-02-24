const homePath = '/';

export interface Route {
  path: string;
  getPath: (...args: string[]) => string;
}

export type Routes = Record<string, Route>;

export type WithDirectRoutes = Record<
  string,
  Route & {
    getDirectPath: (...args: string[]) => string;
  }
>;

export const routes: Routes = {
  home: {
    path: homePath,
    getPath: (): string => routes.home.path
  },
  login: {
    path: `${homePath}login`,
    getPath: (): string => routes.login.path
  },
  users: {
    path: `${homePath}users`,
    getPath: (): string => routes.users.path
  },
  requests: {
    path: `${homePath}requests`,
    getPath: (): string => routes.requests.path
  },
  projects: {
    path: `${homePath}projects`,
    getPath: (): string => routes.projects.path
  },
  projectDetails: {
    path: `${homePath}projects/:id`,
    getPath: (id: string): string =>
      routes.projectDetails.path.replace(':id', id)
  }
};
