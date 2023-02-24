import { client } from './constants.js';

const info = [
  {
    type: 'User' as const,
    data: {
      vacationIncrement: 2,
      vacationTotalPerYear: 22
    }
  }
];

/**
 * Seed users.
 */
export const seed = async (): Promise<void> => {
  await client.info.createMany({
    data: info
  });
};
