import { client } from './constants.js';
import { seed as users } from './user.js';
import { seed as info } from './info.js';
import { seed as projects } from './projects.js';
import { seed as roles } from './roles.js';
import { seed as requests } from './requests.js';

/**
 * @param table - table name.
 * Remove data from table.
 */
export const clear = async (table: string): Promise<void> => {
  const typedClient = client as unknown as Record<
    string,
    {
      findMany: (opts: unknown) => Promise<unknown[]>;
      delete: (opts: unknown) => Promise<void>;
    }
  >;

  const data = await typedClient[table].findMany({});

  await Promise.all(
    data.map(
      async ({ id }: { id: string }) =>
        await typedClient[table].delete({
          where: {
            id
          }
        })
    )
  );
};

/**
 * Reset database.
 */
export const reset = async (): Promise<void> => {
  await Promise.all(
    [
      'projectRequest',
      'requestStatus',
      'request',
      'userRole',
      'request',
      'user',
      'project',
      'info',
      'role'
    ].map(async (table) => await clear(table))
  );
};

/**
 * Seed database.
 */
export const main = async (): Promise<void> => {
  await reset();
  await Promise.all([
    await roles(),
    await users(),
    await projects(),
    await info(),
    await requests()
  ]);
};

export { users, roles, projects, info };
