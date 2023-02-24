import type { Maybe, Nullable } from '@dot-tools/types';
import type {
  CodeResponse,
  Credentials,
  OverridableTokenClientConfig
} from '@dot/auth';
import { useAuth, useUserCredentials } from '@dot/auth';
import { request } from '@dot/query';
import { useCallback, useEffect } from 'react';

/**
 * Logic hook.
 *
 * @returns Logic functionality.
 */
export const useLogic = (): {
  login: (opts?: Maybe<OverridableTokenClientConfig>) => void;
  userCredentials: Nullable<Credentials>;
} => {
  const { data, mutate } = request.users.getIdToken.useMutation();
  const { code, updateUserCredentials } = useAuth({
    hosted_domain: import.meta.env.DOT_HOSTED_DOMAIN,
    onSuccess: useCallback(
      (data: CodeResponse) => {
        mutate({
          code: data.code
        });
      },
      [mutate]
    )
  });

  useEffect(() => {
    if (data) {
      updateUserCredentials(data);
    }
  }, [data, updateUserCredentials]);

  return {
    login: code,
    userCredentials: useUserCredentials()
  };
};
