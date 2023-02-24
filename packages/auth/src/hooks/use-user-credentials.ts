import type { Nullable } from '@dot-tools/types';
import type { Credentials } from '@dot/server';
import { useContext } from 'react';
import { AuthContext } from '../constants.js';

/**
 * User credentials hook.
 *
 * @returns Authorized user credentials.
 */
export const useUserCredentials = (): Nullable<Credentials> =>
  useContext(AuthContext).userCredentials;
