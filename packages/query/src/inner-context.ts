import { createContext } from 'react';
import type { InnerContextProps } from './types.js';

export const InnerContext = createContext<InnerContextProps>({
  errors: [],
  reset: () => undefined,
  performVisited: () => undefined,
  visited: null,
  updateVisited: () => undefined
});
