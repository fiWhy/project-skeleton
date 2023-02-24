import type { Maybe, Nullable } from '@dot-tools/types';
import type { Credentials, FromAppRouter } from '@dot/server';
import type {
  CodeResponse,
  OverridableTokenClientConfig,
  TokenResponse,
  UseGoogleLoginOptionsAuthCodeFlow,
  UseGoogleLoginOptionsImplicitFlow
} from '@react-oauth/google';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useCallback, useContext } from 'react';
import { AuthContext, USER_DATA_KEY } from '../constants.js';
import type { CodeFlowOptions, ImplicitFlowOptions } from '../types.js';
import { useUserCredentials } from './use-user-credentials.js';

/**
 * Auth hook.
 *
 * @param opts - Overrideable request config.
 * @returns Auth logic.
 */
export const useAuth = (
  opts?: Maybe<CodeFlowOptions | ImplicitFlowOptions>
): {
  implicit: (data?: Maybe<OverridableTokenClientConfig>) => void;
  code: (data?: Maybe<OverridableTokenClientConfig>) => void;
  updateUserCredentials: (data: Nullable<Credentials>) => void;
  updateUser: (data: Maybe<FromAppRouter['users']['currentUser']>) => void;
  logout: () => void;
  userCredentials: Nullable<Credentials>;
  tokenKey: string;
} => {
  const authContext = useContext(AuthContext);
  const { onSuccess } = opts ?? {};

  const handleImplicitFlow = useCallback(
    (data: TokenResponse) => {
      authContext.onUpdateUserCredentials(data);
      (onSuccess as UseGoogleLoginOptionsImplicitFlow['onSuccess'])?.(data);
    },
    [authContext, onSuccess]
  );

  const handleCodeFlow = useCallback(
    (data: CodeResponse) => {
      (onSuccess as UseGoogleLoginOptionsAuthCodeFlow['onSuccess'])?.(data);
    },
    [onSuccess]
  );

  const handleLogout = useCallback(() => {
    googleLogout();
    authContext.onUpdateUserCredentials(null);
  }, [authContext]);

  return {
    implicit: useGoogleLogin({
      ...(opts as Omit<UseGoogleLoginOptionsImplicitFlow, 'flow'>),
      flow: 'implicit',
      onSuccess: handleImplicitFlow
    }),
    code: useGoogleLogin({
      ...(opts as Omit<UseGoogleLoginOptionsAuthCodeFlow, 'flow'>),
      flow: 'auth-code',
      onSuccess: handleCodeFlow
    }),
    logout: handleLogout,
    updateUserCredentials: authContext.onUpdateUserCredentials,
    updateUser: authContext.onUpdateUser,
    userCredentials: useUserCredentials(),
    tokenKey: USER_DATA_KEY
  };
};
