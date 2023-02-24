import { createContext } from 'react';
import type { ContextProps } from './types.js';

export const Context = createContext<ContextProps>({
  error: () => undefined,
  info: () => undefined,
  warn: () => undefined,
  success: () => undefined
});
