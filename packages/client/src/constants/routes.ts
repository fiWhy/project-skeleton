const homePath = '/';

export type Routes = Record<
  string,
  {
    path: string;
    getPath: (...args: string[]) => string;
  }
>;

export const routes: Routes = {
  home: {
    path: homePath,
    getPath: (): string => routes.home.path
  }
};
