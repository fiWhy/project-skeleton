import type { InnerContextProps } from '../types.js';
import { useContext } from 'react';
import { InnerContext } from '../inner-context.js';

/**
 * Status hook.
 *
 * @returns Inner context props.
 */
export const useStatus = (): InnerContextProps => useContext(InnerContext);
