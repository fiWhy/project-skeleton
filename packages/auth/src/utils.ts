import type { Nullable } from '@dot-tools/types';
import type { Credentials } from '@dot/server';
import { USER_DATA_KEY } from './constants.js';

/**
 * Get the token from localstorage.
 *
 * @returns Token.
 */
export const getIdToken = (): Nullable<string> => {
  try {
    const userData = JSON.parse(
      localStorage.getItem(USER_DATA_KEY) ?? '{}'
    ) as Credentials;

    return userData.id_token ?? null;
  } catch {
    return null;
  }
};
