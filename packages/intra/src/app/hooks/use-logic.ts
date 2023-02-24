import type { Maybe, Nullable } from '@dot-tools/types';
import type { Credentials } from '@dot/auth';
import { useAuth, useUserCredentials } from '@dot/auth';
import { useTheme } from '@dot/ui';
import type { Theme } from '@dot/ui/themes';
import { useEffect } from 'react';
import { request, useStatus } from '@dot/query';
import { useToast } from '#~/providers/index.js';

/**
 * Logic hook.
 *
 * @returns User and theme.
 */
export const useLogic = (): {
  userCredentials: Nullable<Credentials>;
  theme?: Maybe<Theme>;
} => {
  const { updateUser } = useAuth();
  const userCredentials = useUserCredentials();
  const { error } = useToast();
  const { errors: queryErrors } = useStatus();
  const { data: user } = request.users.currentUser.useQuery(undefined, {
    enabled: !!userCredentials,
    refetchOnMount: false
  });

  useEffect(() => {
    if (queryErrors.length) {
      queryErrors.forEach((err) => {
        error(err.message);
      });
    }
  }, [queryErrors, error]);

  useEffect(() => {
    updateUser(user);
  }, [updateUser, user]);

  return {
    userCredentials,
    theme: useTheme()
  };
};
