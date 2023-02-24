import type { Role } from '@prisma/client';

/**
 * @param find - Search for roles.
 * @param roles - Current roles from database.
 *
 * Filter current roles and find matchings.
 * @returns Found roles.
 */
export const getRoles = (find: string[], roles: Role[]): Role[] =>
  roles.filter((role) => find.includes(role.name));
