import { client } from './constants.js';
import { Role } from '@dot/models';

/**
 * Seed roles.
 */
export const seed = async (): Promise<void> => {
  await client.role.createMany({
    data: Object.entries(Role).map(([name, description]) => ({
      name,
      description
    }))
  });
};
