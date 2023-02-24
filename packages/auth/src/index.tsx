import type { Maybe, Nullable, WithChildren } from '@dot-tools/types';
import type { Credentials, FromAppRouter } from '@dot/server';
import { useLocalStorage } from '@mantine/hooks';
import type {
  CodeResponse,
  OverridableTokenClientConfig,
  TokenResponse
} from '@react-oauth/google';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import type { ReactElement } from 'react';
import { useState } from 'react';
import { AuthContext, USER_DATA_KEY } from './constants.js';

/**
 * `<AuthProvider>` component.
 */
export const AuthProvider = ({
  children,
  clientId
}: WithChildren<{
  clientId: string;
}>): ReactElement => {
  const [userCredentials, setUserCredentials] = useLocalStorage<
    Nullable<Credentials>
  >({
    key: USER_DATA_KEY,
    defaultValue: null
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [user, setUser] = useState<Maybe<FromAppRouter['users']['profile']>>();

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AuthContext.Provider
        value={{
          userCredentials,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          user,
          onUpdateUserCredentials: setUserCredentials,
          onUpdateUser: setUser
        }}
      >
        {children}
      </AuthContext.Provider>
    </GoogleOAuthProvider>
  );
};

export * from './hooks/index.js';
export type { CodeFlowOptions, ImplicitFlowOptions } from './types.js';
export { getIdToken } from './utils.js';
export { useGoogleLogin };
export type { Credentials };
export type { OverridableTokenClientConfig, TokenResponse, CodeResponse };
