import { createContext } from 'react';
import type { AuthContextProps } from './types.js';

export const AuthContext = createContext<AuthContextProps>({
  userCredentials: null,
  user: undefined,
  onUpdateUserCredentials: () => undefined,
  onUpdateUser: () => undefined
});

export const USER_DATA_KEY = 'user:data';
