export type QueryKeys = Record<
  string,
  {
    keys: string[];
    getKeys: (...args: string[]) => string[];
  }
>;

export const queryKeys: QueryKeys = {
  user: {
    keys: ['user'],
    getKeys: () => queryKeys.user.keys
  }
};
