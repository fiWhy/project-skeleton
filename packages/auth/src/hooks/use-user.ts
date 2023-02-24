import type { Maybe } from '@dot-tools/types';
import type { FromAppRouter } from '@dot/server';
import { useContext } from 'react';
import { AuthContext } from '../constants.js';

/**
 * User hook.
 *
 * @returns Authorized user.
 */
export const useUser = (): Maybe<FromAppRouter['users']['currentUser']> =>
  useContext(AuthContext).user;
