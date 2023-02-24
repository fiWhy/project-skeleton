import { useContext } from 'react';
import { Context } from '../context.js';
import type { ContextProps } from '../types.js';

/**
 * Toast context getter hook.
 *
 * @returns Toast context.
 */
export const useToast = (): ContextProps => useContext(Context);
